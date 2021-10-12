export const formatFromApi = (apiModel) => {
	return ({
		id: apiModel.id ?? '',
		description: apiModel.description.value ?? '',
		criticality: apiModel.attributes.value.criticality ?? 'low',
		status: apiModel.status.value ?? 'open',
		dateCreated: apiModel.dateCreated ?? '',
		category: apiModel.attributes.value.['category-type'] ?? 'other',
		orderType: apiModel.attributes.value['issue-type'] ?? '',
		serviceCode: apiModel.service_code.value ?? '',
		serviceName: apiModel.service_name.value ?? '',
		devices: apiModel.attributes.value['relationed-device'] ?? '',
	});
}