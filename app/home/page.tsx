import React, {memo} from "react";

const Home = () => {
    return (
        <div className="HomePage">
            <div className="HomeBody">
                <div className="Arrow">
                    {"<=  тут будет показана статистика по командам"}
                </div>
                <div className="Arrow">
                    {"<=  тут можно создавать спринты из задач"}
                </div>
                <div className="Arrow">
                    {"<=  тут можно создавать задачи"}
                </div>
            </div>
        </div>
    )
}

export default memo(Home)
