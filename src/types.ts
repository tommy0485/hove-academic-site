export interface SiteMeta {
	title: string;
	description: string;
	ogImage?: string;
	canonicalURL?: string;
}

export interface Publication {
	title: string;
	authors: string[];
	venue: string;
	year: number;
	keywords: string[];
	url?: string;
	pdf?: string;
	code?: string;
	note?: string; // e.g., "Best Paper"
}

export interface Project {
	title: string;
	description: string;
	keywords: string[];
	link?: string;
	status: 'In Progress' | 'Completed' | 'On Hold';
}