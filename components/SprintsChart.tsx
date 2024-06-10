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
import React, {memo, useCallback, useEffect, useState} from "react";
import {DocumentData, Timestamp} from "firebase/firestore";

interface Task {
    completed: boolean,
    completedDate?: string,
    description: string,
    id: string,
    name: string,
    score: number,
    sprint: string
}

interface Sprint {
    commandId: string,
    completedDate?: string,
    creationDate: Timestamp,
    id: string,
    number: number,
    score?: number,
    sprintState: "during" | "completed",
    uncomletedTasks?: Task[]
}

interface Props {
    lastSprints: Sprint[] | DocumentData[],
    currentSprint: Sprint | DocumentData,
    currentSprintScore: number
}

const SprintsChartAndStats = (props: Props) => {

    ChartJS.register(
        CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
    )

    console.log('props.lastSprints', JSON.stringify(props.lastSprints, null, 2));
    const [lastSprints, setLastSprints] = useState<Sprint[]>()
    const currentSprintScore: number = props.currentSprintScore
    const mathExpected: number = props.lastSprints.reduce((acc, {sprintState: sprintState, score: score}) => {
        acc = (score ? acc + score : (sprintState === "during" ? acc + currentSprintScore : acc))
        return acc
    }, 0) / props.lastSprints.length

    const mathDispersion: number = props.lastSprints.reduce((acc, {sprintState: sprintState, score: score}) => {
        acc = Number((score ? acc + Math.pow(score - mathExpected, 2) : (sprintState === "during" ? acc + Math.pow(currentSprintScore - mathExpected, 2) : acc + Math.pow(mathExpected, 2))).toFixed(2))
        return acc
    }, 0) / props.lastSprints.length

    const mathStandardDeviation: number = Number(Math.sqrt(mathDispersion).toFixed(2))

    const someAdvice = (probabilityCorrespondence: number | null) => {
        console.log('probabilityCorrespondence', JSON.stringify(probabilityCorrespondence, null, 2));
        switch (true) {
            case (probabilityCorrespondence!=null && probabilityCorrespondence< 0.3) :
                return "Сложность спринтов стабильна. Нагрузка команды одинакова"
            case (probabilityCorrespondence!=null && probabilityCorrespondence <= 0.7) :
                return "Сложность спринтов нестабильна. Нагрузка команды неравномерна"
            case (probabilityCorrespondence!=null && probabilityCorrespondence > 0.7) :
                return "Сложность спринтов очень нестабильна. Нагрузка команды очень неравномерна, либо отсутствует статистика"
            case (probabilityCorrespondence === null) :
                return "Нет статистики по сложности спринтов"
        }
    }

    useEffect(() => {
        let sortedSprints = props.lastSprints.sort(({number: a}, {number: b}) => {
            return a - b
        })
        console.log('sortedSprints', JSON.stringify(sortedSprints, null, 2));
        // @ts-ignore
        setLastSprints(sortedSprints)
    }, [props.lastSprints])

    const graphLabels = useCallback(() => {
        let labels: string[] | undefined = lastSprints?.map(sprint => ("Спринт №: " + sprint.number.toString()))
        return labels
    }, [lastSprints])

    const graphData = useCallback(() => {
        // @ts-ignore
        let data: number[] | undefined = lastSprints?.map(sprint => sprint.score | 0)
        if (props.currentSprint.sprintState === "during") {
            if (data) {
                data[data?.length - 1] = currentSprintScore
            }
        }
        return data
    }, [currentSprintScore, lastSprints, props.currentSprint.sprintState])

    const data = {
        labels: graphLabels(),
        datasets: [
            {
                label: "Сложность спринтов",
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
                legend: {
                    display: false,
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'последние спринты',
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
                    text: 'Сложность спринтов',
                    color: '#2c2c2c',
                    font: {
                        family: 'sans-serif',
                        size: 20,
                        weight: 'bold',
                    },
                },
                min: 0,
            }
        },
    }
    return <div className="StatContainer">
        <div className="ChartContainer">
            {/* @ts-ignore*/}
            <Line options={options} data={data} type={"line"}/>
        </div>
        <div className="ComponentContainer">
            <p>{"За последние 5 спринтов"}</p>
            <div className="Component">
                {`Средняя сложность спринта: ${mathExpected}`}
            </div>
            <div className="Component">
                {`Среднеквадратическое отклонение сложности спринта от средней сложности: ${mathStandardDeviation}`}
            </div>
            <div className="Component">
                {someAdvice(mathStandardDeviation/mathExpected)}
            </div>
        </div>
    </div>
}

export default memo(SprintsChartAndStats)
