import http from "../http-common";
class TrackDataService {
  getAllTracks(albumId) {
    return http.get(`/artists/albums/${albumId}/tracks`);
  }
  getTrack(albumId,id) {
    return http.get(`/artists/albums/${albumId}/tracks/${id}`);
  }
  createTrack(albumId,data) {
    return http.post(`/artists/albums/${albumId}/tracks`, data);
  }
  updateTrack(albumId,id, data) {
    return http.put(`/artists/albums/${albumId}/tracks/${id}`, data);
  }
  deleteTrack(albumId,id) {
    return http.delete(`/artists/albums/${albumId}/tracks/${id}`);
  }
  deleteAll(albumId){
    return http.delete(`/artists/albums/${albumId}/tracks`);
  }

}
export default new TrackDataService();