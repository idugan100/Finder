// export type missing_person_blob = {
// 	id: number;
// 	photo_path: Blob;
// 	name: string;
// 	location_last_seen: string;
// 	date_last_seen: string;
// };

// export type missing_persons_buffer = {
// 	id: number;
// 	photo_path: ArrayBuffer;
// 	name: string;
// 	location_last_seen: string;
// 	date_last_seen: string;
// };
export type missing_persons_final = {
	id: number;
	photo_path: string;
	name: string;
	location_last_seen: string;
	date_last_seen: string;
};

export type log = {
	id: number;
	clip_path: string;
	pct_match: number;
	person_id: number;
	location: string;
	time: string;
};

export type admin_users = {
	id: number;
	username: string;
	password: string;
};
