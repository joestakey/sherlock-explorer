export interface Element {
  repository_url: string;
  body: string;
  labels: any[];
  created_at: string;
  title: string;
  url: string;
}

export const createFile = (sortedItems: Element[], user: string, isHigh: boolean) => {

  let finalText = `# ${user} ${isHigh ? `high` : `medium`} severity reports in Sherlock contests\n\n`;
  
  sortedItems.forEach((element: Element) => {
    const { repository_url, body } = element;
    const title = repository_url.replace(/^.*\/(\d{4}-\d{2}-[a-zA-Z0-9]+(-[a-zA-Z0-9]+)?)-judging$/, '$1');
    let cleanedBody = body;
    const duplicateMatch = cleanedBody.match(/Duplicate (of |)#\d{1,4}/);
    if (duplicateMatch) {
      cleanedBody = cleanedBody.replace(duplicateMatch[0], '');
    }
    const regex = new RegExp(`(medium|high)\n\n|(medium|high)\r\n\r\n`, "g");
    cleanedBody = cleanedBody.replace(regex, "");
    finalText += `## ${title}\n\n${cleanedBody}\n\n`;
  });
  return finalText;
}
