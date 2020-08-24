import axios from "axios";

const url = "api/data/";

class DataService {
  // Get Data
  static getData() {
    return new Promise((resolve, reject) => {
      try {
        axios.get(url).then((res) => {
          // console.log(res.data[0].drawflow);

          const data = res.data;
          resolve(
            data.map((post) => ({
              ...post,
              //createdAt: new Date(post.createdAt),
            }))
          );
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // Create Data
  static insertData(text) {
    return axios.post(url, {
      text,
    });
  }
}

export default DataService;
