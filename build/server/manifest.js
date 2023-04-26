const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["API.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.d5009296.js","imports":["_app/immutable/entry/start.d5009296.js","_app/immutable/chunks/index.ef99c551.js","_app/immutable/chunks/singletons.e9218bed.js","_app/immutable/chunks/index.8eefe5a4.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.d1324003.js","imports":["_app/immutable/entry/app.d1324003.js","_app/immutable/chunks/index.ef99c551.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./chunks/0-ae790070.js'),
			() => import('./chunks/1-2424f59c.js'),
			() => import('./chunks/2-11ecda3d.js'),
			() => import('./chunks/3-09f4b373.js'),
			() => import('./chunks/4-ba024c5c.js'),
			() => import('./chunks/5-d7818d95.js'),
			() => import('./chunks/6-290d0539.js'),
			() => import('./chunks/7-6ba35490.js'),
			() => import('./chunks/8-895b11fb.js'),
			() => import('./chunks/9-a59abf04.js'),
			() => import('./chunks/10-60102812.js'),
			() => import('./chunks/11-36d38fcc.js'),
			() => import('./chunks/12-0fd8d994.js'),
			() => import('./chunks/13-e08d02fa.js'),
			() => import('./chunks/14-fbf7f254.js'),
			() => import('./chunks/15-1a5e364b.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/analytics",
				pattern: /^\/analytics\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/association-stats",
				pattern: /^\/association-stats\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			},
			{
				id: "/association-stats/integrations",
				pattern: /^\/association-stats\/integrations\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 6 },
				endpoint: null
			},
			{
				id: "/association-stats/integrations/d3",
				pattern: /^\/association-stats\/integrations\/d3\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 7 },
				endpoint: null
			},
			{
				id: "/association-stats/integrations/highcharts",
				pattern: /^\/association-stats\/integrations\/highcharts\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 8 },
				endpoint: null
			},
			{
				id: "/association-stats/search",
				pattern: /^\/association-stats\/search\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 9 },
				endpoint: null
			},
			{
				id: "/association-stats/[province]/[registration_date]",
				pattern: /^\/association-stats\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"province","optional":false,"rest":false,"chained":false},{"name":"registration_date","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 10 },
				endpoint: null
			},
			{
				id: "/phone-line-stats",
				pattern: /^\/phone-line-stats\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 11 },
				endpoint: null
			},
			{
				id: "/phone-line-stats/[province]/[year]",
				pattern: /^\/phone-line-stats\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"province","optional":false,"rest":false,"chained":false},{"name":"year","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 12 },
				endpoint: null
			},
			{
				id: "/projection-homes-stats",
				pattern: /^\/projection-homes-stats\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 13 },
				endpoint: null
			},
			{
				id: "/projection-homes-stats/[province]/[year]",
				pattern: /^\/projection-homes-stats\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"province","optional":false,"rest":false,"chained":false},{"name":"year","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 14 },
				endpoint: null
			},
			{
				id: "/react",
				pattern: /^\/react\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 15 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

const prerendered = new Set([]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map
