import http from "../http-common";
class AlbumDataService {
  getAllAlbums(artistId) {
    return http.get(`/artists/${artistId}/albums`);
  }

  get(artistId,id) {
    return http.get(`/artists/${artistId}/albums/${id}`);
  }

  getAlbum(id){
    return http.get(`artists/albums/${id}`);
  }

  create(artistId,data) {
    return http.post(`/artists/${artistId}/albums`, data);
  }

  update(artistId,id, data) {
    return http.put(`/artists/${artistId}/albums/${id}`, data);
  }
  delete(id) {
    return http.delete(`/artists/albums/${id}`);
  }
  deleteAll() {
    
    return http.delete(`/artists/albums/delete/all`);
  }
  findByTitle(artistId,title) {
    return http.get(`artists/${artistId}/search/${title}`);
  }
}
export default new AlbumDataService();