export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/about": [3],
		"/analytics": [4],
		"/association-stats": [5],
		"/association-stats/integrations": [6],
		"/association-stats/integrations/d3": [7],
		"/association-stats/integrations/highcharts": [8],
		"/association-stats/search": [9],
		"/association-stats/[province]/[registration_date]": [10],
		"/phone-line-stats": [11],
		"/phone-line-stats/[province]/[year]": [12],
		"/projection-homes-stats": [13],
		"/projection-homes-stats/[province]/[year]": [14],
		"/react": [15]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';