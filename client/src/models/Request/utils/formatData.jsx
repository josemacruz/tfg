export const formatFromApi = (apiModel) => {
	console.log(apiModel)
	return ({
		id: apiModel.id ?? '',
		description: apiModel.description.value ?? '',
		criticality: apiModel.attributes.value.criticality ?? 'low',
		status: apiModel.status.value ?? 'open',
		dateCreated: apiModel.dateCreated ?? '',
		category: apiModel.attributes.value.category ?? 'other',
		orderType: apiModel.attributes.value.orderType ?? '',
		serviceCode: apiModel.service_code.value ?? '',
		serviceName: apiModel.service_name.value ?? '',
	});
}