import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { data: tournaments } = await locals.supabase
		.from('tournament')
		.select('*')
		.eq('organization_id', params.id)
		.is('deleted_at', null)
		.order('start_date', { ascending: false });

	return {
		tournaments: tournaments || [],
		organizationId: params.id
	};
};
