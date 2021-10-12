
export const getFormattedIssues = (issues, services) => {
  const formattedIssues = [];
  if (services.length) {
    issues.forEach((issue) => {
      const family = services.find((o) => o.name === issue.serviceCode);
      const subFamily = services.find((o) => o.name === issue.serviceName);
      const newIssue = {
        ...issue,
        criticality: issue.criticality[0],
        family,
        subFamily,
      };
      formattedIssues.push(newIssue);
    });
  }
  return formattedIssues;
}