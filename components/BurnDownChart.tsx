"use client"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import {Line} from "react-chartjs-2"
import React, {memo, useCallback, useEffect, useMemo, useState} from "react";
import {collection, DocumentData, getDocs, query, Timestamp, where} from "firebase/firestore";
import dayjs from "dayjs";
import {db} from "../app/services/Firebase";

dayjs.extend(require('dayjs/plugin/customParseFormat'))

interface Task {
    completed: boolean,
    completedDate: string,
    description: string,
    id: string,
    name: string,
    score: number,
    sprint: string
}

interface Sprint {
    commandId: string,
    completedDate: string,
    creationDate: Timestamp,
    id: string,
    number: number,
    score: number,
    sprintState: "during" | "completed",
    uncomletedTasks: Task[]
}

interface Props {
    currentSprint: Sprint | DocumentData,
    lastSprints: Sprint[] | DocumentData[],
    userID: string,
    setScoreFunc: (num: number) => void
}

interface Point {
    x: string,
    y: number
}

const BurnDownChartAndStats = (props: Props) => {

    ChartJS.register(
        CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
    )

    console.log(props.currentSprint)
    console.log(props.lastSprints)

    const [currentSprintTasks, setCurrentSprintTasks] = useState<Task[]>([])
    const firstDate: string = useMemo(() => {
        return dayjs(props.currentSprint.creationDate.seconds * 1000).format("DD-MM-YYYY")
    }, [props.currentSprint.creationDate.seconds])
    const lastDate: string = useMemo(() => {
        return props.currentSprint.completedDate ? props.currentSprint.completedDate : dayjs().format("DD-MM-YYYY")
    }, [props.currentSprint.completedDate])
    const tasksCount: number = (props.currentSprint.uncomletedTasks ? props.currentSprint.uncomletedTasks.length : 0) + currentSprintTasks.length
    const completedTaskCount: number = currentSprintTasks.reduce((acc, task) => {
        if (task.completed) acc++
        return acc
    }, 0)
    const sprintScore:number = props.currentSprint.score | currentSprintTasks.reduce((acc, task) => {
        if (task.score) acc = acc + task.score
        return acc
    }, 0)
    props.setScoreFunc(sprintScore)
    const sprintLength = dayjs(lastDate, "DD-MM-YYYY").diff(dayjs(firstDate, "DD-MM-YYYY"), "day")

    useEffect(() => {
        getDocs(query(collection(db, "users", props.userID, "tasks"), where("sprint", "==", props.currentSprint.id))).then(r => {
            const tasksArray = r.docs.map(doc => doc.data())
            console.log('tasksArray', JSON.stringify(tasksArray, null, 2));
            const sortedTasksArray = tasksArray.sort(({completedDate: A}, {completedDate: B}) => {
                console.log("A", A)
                console.log("B", B)
                if (!B) return -100
                if (!A) return 100
                return dayjs(A, "DD-MM-YYYY").diff(dayjs(B, "DD-MM-YYYY"))
                //return !A || B! ? dayjs(A).diff(dayjs(B)) : -100
            })
            console.log(sortedTasksArray)
            setCurrentSprintTasks(sortedTasksArray as Task[])
        })
    }, [props.currentSprint.id, props.userID])

    const graphLabels = useCallback(() => {

        let labels: string[] = []
        /*const tasksLabels: string[] = currentSprintTasks.reduce((acc, task) => {
            if (task.completed) {
                acc.push(task.completedDate.toString())
            }
            return acc
        }, [] as string[])
        labels = labels.concat(tasksLabels)

        console.log("________________________________")
        console.log(labels)
        console.log("________________________________")

        const maybeLastLabel:string = props.currentSprint.completedDate ? props.currentSprint.completedDate : dayjs(Timestamp.now().toDate()).format("DD-MM-YYYY")
        if (labels[labels.length-1] != maybeLastLabel){
            labels.push(maybeLastLabel)
        }*/

        //const firstLabel = dayjs(props.currentSprint.creationDate.seconds*1000)
        //const lastLabel:string = props.currentSprint.completedDate ? props.currentSprint.completedDate : dayjs().format("DD-MM-YYYY")
        //const sprintLength = dayjs(lastDate, "DD-MM-YYYY").diff(firstLabel, "day")
        const sprintLengthLocal = sprintLength
        console.log('sprintLength', JSON.stringify(sprintLengthLocal, null, 2));

        for (let i = 0; i <= sprintLengthLocal; i++) {
            labels.push(dayjs(firstDate, "DD-MM-YYYY").add(i, "day").format("DD-MM-YYYY"))
        }

        /*for (let i:string = dayjs(firstLabelSprintDate); i<dayjs(lastLabel); i.add(1, "day")){
            console.log('i.format("DD-MM-YYYY")', JSON.stringify(i.format("DD-MM-YYYY"), null, 2));
            labels.push(i.format("DD-MM-YYYY"))
        }*/

        console.log('labels', JSON.stringify(labels, null, 2));
        return labels
    }, [firstDate, sprintLength])

    const graphData = useCallback(() => {
        const uncompletedTaskScore: number = (props.currentSprint.uncomletedTasks ? props.currentSprint.uncomletedTasks.reduce((acc:number, task:Task) => {
            return acc + (task.score ? task.score : 1)
        }, 0) : 0)
        const completedTaskScore: number = currentSprintTasks.reduce((acc, task) => {
            return acc + (task.score ? task.score : 1)
        }, 0)
        const score: number = uncompletedTaskScore + completedTaskScore
        console.log('score', JSON.stringify(score, null, 2));

        const percentPerScore: number = 100 / score
        console.log('percentPerScore', JSON.stringify(percentPerScore, null, 2));

        const taskEndDates: string[] = currentSprintTasks.reduce((acc, {completedDate: a}) => {
            if (a) acc.push(a)
            return acc
        }, [] as string[])

        let counter: number = 100
        const dataArray: number[] = currentSprintTasks.reduce((acc, task) => {
            if (task.completed) {
                counter = counter - (task.score ? task.score : 1) * percentPerScore
                acc.push(counter)
            }
            return acc
        }, [100] as number[])
        console.log('dataArray', JSON.stringify(dataArray, null, 2));

        const sprintTasks: string[] = (taskEndDates[taskEndDates.length - 1] != lastDate ? [firstDate, ...taskEndDates, lastDate] : [firstDate, ...taskEndDates])
        console.log('sprintTasks', JSON.stringify(sprintTasks, null, 2));

        let data: Point[] = []
        for (let i = 0; i < sprintTasks.length; i++) {
            data.push({x: sprintTasks[i], y: Number(dataArray[i]? dataArray[i].toFixed(1) : counter.toFixed(1))})
        }

        console.log('data', data);
        return data
    }, [currentSprintTasks, firstDate, lastDate, props.currentSprint.uncomletedTasks])

    const data = {
        labels: graphLabels(),
        datasets: [
            {
                label: "Осталось выполнить задач, %",
                data: graphData(),
                borderColor: '#006989',
                pointStyle: 'round',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointBorderColor: '#102C57',
                pointHoverRadius: 8
            }
        ]
    }

    const options = {
        type: 'line',
        clip: false,
        data: data,
        options: {
            responsive: true,
            plugins: {
                Legend: {
                    display: false,
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Даты',
                    color: '#2c2c2c',
                    font: {
                        family: 'sans-serif',
                        size: 20,
                        weight: 'bold',
                    },
                }
            },
            y: {
                title: {
                    display: true,
                    align: 'center',
                    text: 'Процент невыполненных задач',
                    color: '#2c2c2c',
                    font: {
                        family: 'sans-serif',
                        size: 20,
                        weight: 'bold',
                    },
                },
                min: 0,
                max: 100,
            }
        },
    }

    return (
        <div className="StatContainer">
            <div className="ChartContainer">
                {/* @ts-ignore*/}
                <Line options={options} data={data} type={"line"}/>
            </div>
            <div className="ComponentContainer">
                <p>{"На текущий спринт"}</p>
                <div className="Component">
                    {`Задач было взято на спринт: ${tasksCount}`}
                </div>
                <div className="Component">
                    {`Задач выполнено из спринта: ${completedTaskCount}`}
                </div>
                <div className="Component">
                    {`Сложность спринта оценивается в ${sprintScore} едениц`}
                </div>
                <div className="Component">
                    {`Дней прошло c начала спринта: ${sprintLength} `}
                </div>
            </div>

        </div>
    )
}

export default memo(BurnDownChartAndStats)
