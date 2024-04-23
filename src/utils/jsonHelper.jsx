// Iterate through the API call response and search for only TECHNICAL events
export const filterForTechnical = (input) => {
  var technical = [];

  input.forEach((item) => {
    if (item.type.includes('TECHNICAL')) {
      var obj = {};
      var dt = item.time;

      obj['id'] = item.id;
      obj['time'] = dt.replace('T', ' ').substring(0, 19);
      obj['type'] = item.type;
      obj['subject'] = item.subject;
      obj['relatedprocess'] = item.relatedprocess;
      obj['message'] = item.data.message;

      technical.push(obj);
    }
  });

  return technical;
};
