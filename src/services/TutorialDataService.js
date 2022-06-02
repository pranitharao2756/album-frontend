import http from "../http-common";
class TutorialDataService {
  getAll() {
    return http.get("/albums");
  }
  get(id) {
    return http.get(`/albums/${id}`);
  }
  create(data) {
    return http.post("/albums", data);
  }
  update(id, data) {
    return http.put(`/albums/${id}`, data);
  }
  delete(id) {
    return http.delete(`/albums/${id}`);
  }
  deleteAll() {
    return http.delete(`/albums`);
  }
  findByTitle(title) {
    return http.get(`/albums?title=${title}`);
  }
}
export default new TutorialDataService();