import http from "../http-common";
class LessonDataService {
  getAllLessons(tutorialId) {
    return http.get(`/albums/${tutorialId}/tracks`);
  }
  getLesson(tutorialId,id) {
    return http.get(`/albums/${tutorialId}/tracks/${id}`);
  }
  createLesson(tutorialId,data) {
    return http.post(`/albums/${tutorialId}/tracks`, data);
  }
  updateLesson(tutorialId,id, data) {
    return http.put(`/albums/${tutorialId}/tracks/${id}`, data);
  }
  deleteLesson(tutorialId,id) {
    return http.delete(`/albums/${tutorialId}/tracks/${id}`);
  }
  deleteAll(tutorialId){
    return http.delete(`/albums/${tutorialId}/tracks`);
  }

}
export default new LessonDataService();