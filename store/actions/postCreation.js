import { apiUtils } from "../../source/Constants/api";
import firebase from "../../firebase";

export const CREATE_POST = "CREATE_POST";
export const GET_CATEGORY = "GET_CATEGORY";
export const GET_ALL_POST = "GET_ALL_POST";

const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const getCategory = (category) => {
  return async (dispatch) => {
    const response = await fetch(`${apiUtils.baseUrl}/learnapp/category/list`, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMzNDQxNTM0LCJqdGkiOiI0ZDEzNzliM2ZlMjg0NDUwYjIyZTFjNTQzNTFiZGY4YiIsInVzZXJfaWQiOjR9.8WP1eid61uEjTS73-pkmnDkehYKQbjkiz9VZxkfRPog",
      },
    });
    const resData = await response.json();
    console.log(resData);

    const cat = resData.filter((x) => x.name === category);
    console.log(cat);

    dispatch({ type: GET_CATEGORY, category: cat });
  };
};

export const createPost = (post) => {
  return async (dispatch, getState) => {
    const categoryId = getState().post.category;
    console.log("category => ", categoryId);

    const tempLink = post.link.map((x) => x.url);
    console.log(tempLink);
    const lowerCase = post.tags.map((x) => x.toLowerCase());
    console.log(lowerCase);
    let message = "";

    if (post.image.length === 0) {
      const postResponse = await fetch(
        `${apiUtils.baseUrl}/learnapp/post/create/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMzNDQxNTM0LCJqdGkiOiI0ZDEzNzliM2ZlMjg0NDUwYjIyZTFjNTQzNTFiZGY4YiIsInVzZXJfaWQiOjR9.8WP1eid61uEjTS73-pkmnDkehYKQbjkiz9VZxkfRPog",
          },
          body: JSON.stringify({
            title: post.title,
            description: post.description,
            resources: tempLink,
            tags: lowerCase,
            category: categoryId[0].id,
          }),
        }
      );
      const postResData = await postResponse.json();
      console.log(postResData);

      if (postResData.errors && postResData.errors.length !== 0) {
        message = "You have already made a post with this title.";
        throw new Error(message);
      }
    } else {
      let url = "";
      console.log("firebase shit !", post.image[0].uri);
      const tempUrl = post.image[0].uri;
      const fileName = uuidv4();
      const formData = new FormData();

      formData.append("image", {
        uri: tempUrl,
        name: fileName,
        type: `image/*`,
      });
      const urlPostResponse = await fetch(
        `${apiUtils.baseUrl}/learnapp/file/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMzNDQxNTM0LCJqdGkiOiI0ZDEzNzliM2ZlMjg0NDUwYjIyZTFjNTQzNTFiZGY4YiIsInVzZXJfaWQiOjR9.8WP1eid61uEjTS73-pkmnDkehYKQbjkiz9VZxkfRPog",
          },
          body: formData,
        }
      );
      const urlPostResData = await urlPostResponse.json();
      console.log("***", urlPostResData); // gives {stats: true, url: //firebase-url OwO}
      if (Array.isArray(urlPostResData)) {
        message = "Failed to upload the image";
        throw new Error(message);
      } else {
        url = urlPostResData.url;

        console.log(url);

        const imagePostResponse = await fetch(
          `${apiUtils.baseUrl}/learnapp/post/create/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMzNDQxNTM0LCJqdGkiOiI0ZDEzNzliM2ZlMjg0NDUwYjIyZTFjNTQzNTFiZGY4YiIsInVzZXJfaWQiOjR9.8WP1eid61uEjTS73-pkmnDkehYKQbjkiz9VZxkfRPog",
            },
            body: JSON.stringify({
              title: post.title,
              description: post.description,
              resources: tempLink,
              tags: lowerCase,
              category: categoryId[0].id,
              image: url,
            }),
          }
        );
        const imagePostResData = await imagePostResponse.json();
        console.log("*****", imagePostResData);

        if (imagePostResData.errors && imagePostResData.errors.length !== 0) {
          message = "You have already made a post with this title.";
          throw new Error(message);
        }
      }
    }
    console.log(":))))");
    dispatch({ type: CREATE_POST });
  };
};

export const getAllPost = () => {
  return async (dispatch) => {
    const response = await fetch(
      `${apiUtils.baseUrl}/learnapp/post/list?query=newest`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMzNDQxNTM0LCJqdGkiOiI0ZDEzNzliM2ZlMjg0NDUwYjIyZTFjNTQzNTFiZGY4YiIsInVzZXJfaWQiOjR9.8WP1eid61uEjTS73-pkmnDkehYKQbjkiz9VZxkfRPog",
        },
      }
    );
    const resData = await response.json();
    console.log(resData);
    dispatch({ type: GET_ALL_POST });
  };
};
