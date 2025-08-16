import type { Timestamp } from 'firebase/firestore';

export interface Task {
	id: string;
	userId: string;
	title: string;
	intervalDays: number;
	lastCompleted: Timestamp;
	nextDueDate: Timestamp;
}
