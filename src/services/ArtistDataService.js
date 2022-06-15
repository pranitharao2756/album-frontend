import http from "../http-common";
class ArtistDataService {
  getArtist(id) {
    return http.get(`/albums/artists/${id}`);
  }
  createArtist(data) {
    return http.post(`/albums/artists`, data);
  }
}
export default new ArtistDataService();