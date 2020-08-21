import axios from "axios";

const url = "api/data/";

class PostService {
  // Get Data
  static getData() {
    return new Promise((resolve, reject) => {
      try {
        axios.get(url).then((res) => {
          const data = res.data;
          resolve(
            data.map((post) => ({
              ...post,
              createdAt: new Date(post.createdAt),
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

export default PostService;
