const headers = {
  Accept: "application/json"
};

let handleErrors = response => {
  console.log(response, "Error faild to fetch");
};
export const getAll = () =>
  fetch(
    "https://api.foursquare.com/v2/venues/search?ll=33.5725875,-112.1847509&intent=browse&radius=7000&query=restaurants&client_id=LA4NO2OWJ1N5M5WGWSTXSNJVPSIOKKWYAS1H4YSUYLSFXGNO&client_secret=PDTPMBJXHSFHOL41NWN5SRZ53LSXJBNQQKFRHHLO040V24IT&v=20180910",
    { headers }
  )
    .then(res => res.json())
    .then(data => data.response.venues)
    .catch(handleErrors);
