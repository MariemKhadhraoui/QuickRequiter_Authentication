import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchJob = (id) => API.get(`/jobs/${id}`);
export const fetchJobs = (page) => API.get(`/jobs?page=${page}`);
export const fetchJobsByCreator = (name) => API.get(`/jobs/creator?name=${name}`);
export const fetchJobsBySearch = (searchQuery) => API.get(`/jobs/search?searchQuery=${searchQuery.search || 'none'}`);
export const createJob = (newPost) => API.post('/jobs', newPost);
export const likeJob = (id) => API.patch(`/jobs/${id}/likeJob`);
export const comment = (value, id) => API.post(`/jobs/${id}/commentJob`, { value });
export const updateJob = (id, updatedJob) => API.patch(`/jobs/${id}`, updatedJob);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);
export const filterByLocation = (localisation) => API.get(`/jobs/filter/${localisation}`);




export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const forgotPassword = (email) => API.post('/user/forgotPassword', { email });
export const signInWithGoogle = (formData) => API.post('/user/signinWithGoogle', formData);
export const generateTwoFactor = (email) => API.post('/two-factor/generateTwoFactor', { email });
export const validateTwoFactor = (email, otpCode, expiresIn) => API.post('/two-factor/validateTwoFactor', { email, otpCode, expiresIn });
export const changePasswordAPI = (oldPassword, newPassword) => API.post('/user/changePassword', { oldPassword, newPassword });
export const updateUserProfileAPI = ( userData) => API.post(`user/updatProfile`, userData);

//users
export const listUsers = () => API.get(`/user/listUser`);
export const verifyUser = (id) => API.get(`/user/verifyUser/${id}`);
export const unverifyUser = (id) => API.get(`/user/unverifyUser/${id}`);
export const deleteUser = (id) => API.delete(`/user/deleteUser/${id}`);
export const addUser = (formData) => API.post('/user/addUser', formData);
export const updateUser = (id, updateUser) => API.put(`/user/updateUser/${id}`, updateUser);
export const paginatedUsers = (currentPage, limit) => API.get(`/user/paginatedUsers?currentPage=${currentPage.current}&limit=${limit}`);


export const createUserInterviewAPI = ( name, email ) => API.post('/interview/userInterview', { name, email });


//export const search = (key) => API.get(`/user/search/${key}`);