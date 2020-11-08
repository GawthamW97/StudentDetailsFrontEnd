import axios from "axios";

const baseURL = "http://localhost:55399/api/"; // The URL of the ASP.NET CORE server

export default {
  Student(url = baseURL + "Student/") {
    return {
      fetchAll: () => axios.get(url), //GET::api/Student
      fetchByID: (id) => axios.get(url + id), //GET:: api/Student/{id}
      create: (newRecord) => axios.post(url, newRecord), //POST::api/Student
      update: (id, updatedRecord) => axios.put(url + id, updatedRecord), // PUT:: api/Student
      delete: (id) => axios.delete(url + id), // DELETE:: api/Student
    };
  },
};
