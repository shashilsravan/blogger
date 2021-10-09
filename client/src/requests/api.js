import axios from 'axios';

export const createPost = async (post) => {
    try {
        return await axios.post(`/api/posts/new`, post)
    } catch (error) {
        console.log('error 1 :>> ', error);
    }
}

export const getPosts = async () => {
    try {
        const response = await axios.get(`/api/posts/`)
        return response
    } catch (error) {
        console.log('error 2 :>> ', error);
    }
}

export const getPostsByCategory = async (query) => {
    try {
        const response = await axios.get(`/api/posts/advanced${query}`)
        return response
    } catch (error) {
        console.log('error- :>> ', error);
    }
}

export const getPostById = async (id) => {
    try {
        const response = await axios.get(`/api/posts/${id}`)
        return response
    } catch (error) {
        console.log('error 2 :>> ', error);
    }
}

export const updatePostById = async (id, post) => {
    try {
        const response = await axios.put(`/api/posts/${id}/updat`, post)
        return response
    } catch (error) {
        console.log('error 2 :>> ', error);
    }
}

export const deletePostById = async (id) => {
    try {
        const response = await axios.delete(`/api/posts/${id}/remove`)
        return response
    } catch (error) {
        console.log('error 2 :>> ', error);
    }
}

export const getPostsByUser = async (name) => {
    try {
        const response = await axios.get(`/api/posts/user/${name}`)
        return response
    } catch (error) {
        console.log('error :>> ', error);
    }
}

export const uploadFile = async (data) => {
    try {
        return await axios.post(`/api/posts/images/upload`, data)
    } catch (error) {
        console.log('error :>> ', error);
    }
}

export const createComment = async (data) => {
    try {
        return await axios.post(`/api/posts/comments/new`, data)
    } catch (error) {
        console.log('error 111 :>> ', error);
    }
}

export const getComments = async (id) => {
    try {
        return await axios.get(`/api/posts/comments/${id}`)
    } catch (error) {
        console.log('error 111 :>> ', error);
    }
}

export const deleteAllComments = async (id) => {
    try {
        return await axios.delete(`/api/posts/comments/${id}/remove`)
    } catch (error) {
        console.log('error 111 :>> ', error);
    }
}

export const getThreeBlogs = async (category) => {
    try {
        return await axios.get(`/api/posts/category/${category}`)
    } catch (error) {
        console.log('error 111 :>> ', error);
    }
}

export const getThreePopular = async () => {
    try {
        return await axios.get(`/api/posts/popular`)
    } catch (error) {
        console.log('error 111 :>> ', error);
    }
}

export const getPostsBySearch = async (query) => {
    try {
        const response = await axios.get(`/api/posts/search${query}`)
        console.log('response :>> ', response);
        return response
    } catch (error) {
        console.log('error- :>> ', error);
    }
}