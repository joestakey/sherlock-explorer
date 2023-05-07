import axios from "axios";

async function fetchReports(user: string) {
  let data: any[] = [];
  for (let i: number = 1; i < 4; ++i) {
    const resp = await axios.get(
            `https://api.github.com/search/issues?q=is:issue+in:title%20${user}+label:Medium,High+-label:Low,Informational+-label:"Sponsor Disputed","Sherlock Disputed"+-label:Non-Reward+-in:title%20*${user}*%20user:sherlock-audit`, {
            params: {
              state: "all",
              page: i,
              per_page: 100,
            }
          },
        );
    for (let i = 0; i < resp.data.items.length; i++) {
      if (!resp.data.items[i].title.startsWith(user)) {
        resp.data.items.splice(i, 1);
        i--;
      }
    }
    data = data.concat(resp.data.items);
    if (resp.data.items.length === 0) break;
  }
  return data;
}
  
export default fetchReports;