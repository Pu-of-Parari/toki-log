import {
    createContext,
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	useState
} from "react";

type Props = {
	children: ReactNode;
};

export const TaskTimeContext = createContext({} as {
    taskStartTime: number;
    setTaskStartTime: Dispatch<SetStateAction<number>>;
	taskUserId: number;
	setTaskUserId: Dispatch<SetStateAction<number>>;
});

export const TaskTimeProvider: FC<Props> = (props) => {
	const { children } = props;
	// タスクを配列で保持するState(初期値: 空の配列[])
	const [taskStartTime, setTaskStartTime] = useState<number>(0);
	const [taskUserId, setTaskUserId] = useState<number>(0);

	return (
		<TaskTimeContext.Provider value={{ taskStartTime, setTaskStartTime, taskUserId, setTaskUserId }}>
			{children}
		</TaskTimeContext.Provider>
	);
};