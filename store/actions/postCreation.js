import { apiUtils } from "../../source/Constants/api";
import firebase from "../../firebase";

export const CREATE_POST = "CREATE_POST";
export const GET_CATEGORY = "GET_CATEGORY";
export const GET_ALL_POST = "GET_ALL_POST";
export const CHOOSE_CATEGORY = "CHOOSE_CATEGORY";

const auth_key =
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjM2NDgzNTE4LCJqdGkiOiI2MDEzNjI5MGViYzM0MGY5YTY2ODYzMWI0NzgzYjNiNCIsInVzZXJfaWQiOjIyfQ.qM1b5bpdAKSKeMnnl127KVZgNEx3TWQwtD-nOnc7V-g";

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
        Authorization: auth_key,
      },
    });
    const resData = await response.json();
    // console.log('****',resData);

    const cat = resData.filter((x) => x.name === category);
    // console.log(cat);

    dispatch({ type: GET_CATEGORY, category: cat, allCat: resData });
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
            Authorization: auth_key,
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

      formData.append("file", {
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
            Authorization: auth_key,
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
              Authorization: auth_key,
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

export const getPost = async () => {
  const response = await fetch(
    `${apiUtils.baseUrl}/learnapp/post/list?query=rating`,
    {
      method: "GET",
      headers: {
        Authorization: auth_key,
      },
    }
  );
  const resData = await response.json();
  console.log("resdata", resData);
  return resData;
};

export const chooseCategory = (user_category) => {
  return async (dispatch) => {
    const response = await fetch(`${apiUtils.baseUrl}/accounts/profile/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth_key,
      },
      body: JSON.stringify({
        category: user_category,
      }),
    });
    const resData = await response.json();
    console.log(resData);
    dispatch({ type: CHOOSE_CATEGORY });
  };
};

export const createCollection = async (title, description, idArray) => {
  const response = await fetch(
    `${apiUtils.baseUrl}/learnapp/collection/create/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth_key,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        posts: idArray,
      }),
    }
  );
  const resData = await response.json();
  return resData;
};

export const getProfile = async () => {
  const response = await fetch(`${apiUtils.baseUrl}/accounts/profile/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth_key,
    },
  });
  const resData = await response.json();
  return resData;
};

export const getCollections = async () => {
  const response = await fetch(`${apiUtils.baseUrl}/learnapp/collection/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth_key,
    },
  });
  const resData = await response.json();
  return resData;
};

export const loadStaticImages = async () => {
  console.log("working");
  const formData = new FormData();
  formData.append("type", "backgrounds");
  console.log("FORM", formData);
  try {
    const response = await fetch(`${apiUtils.baseUrl}/learnapp/file/`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: auth_key,
      },
      body: formData,
    });
    const resData = await response.json();
    return resData;
  } catch (err) {
    console.log(err);
  }
};
