import http from "../http-common";
class ArtistDataService {
  getArtist(id) {
    return http.get(`/artists/${id}`);
  }
  createArtist(data) {
    return http.post(`/artists`, data);
  }
  getAll() {
    
    return http.get("/artists");
  }
  update(id, data) {
    return http.put(`/artists/${id}`, data);
  }
  delete(id) {
    return http.delete(`/artists/${id}`);
  }
  deleteAll() {
    return http.delete(`/artists`);
  }
  findByTitle(name) {
    return http.get(`/artists?name=${name}`);
  }
}
export default new ArtistDataService();