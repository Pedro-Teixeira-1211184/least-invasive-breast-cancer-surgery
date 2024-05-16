export interface IPatientPersistence {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	salt: string;
	role: string
	sns: number;
  }