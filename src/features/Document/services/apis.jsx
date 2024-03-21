import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";
export function  fetchDocument(id){

    return  axiosClient.get(`/documents/${id}`)
     .then(({ data }) => {
         return data;
     })
 }
 export function fetchDocuments(params={}) {

       let url=`/documents/user`
     if(params.length>0){
         url=`/documents/user?type=${params.toLowerCase()}`
     }

     return axiosClient.get(url)
         .then(response => {
             return response.data;
         })
         .catch(err => {
             throw err;
         });

 }
 export function storeDocuments(payload) {
     return axiosClient.post("/documents", payload)
     .then(response => {
         return response.data;
     })
     .catch(err => {
         throw err;
     });
 }

 export function updateDocument(payload) {
     const {id,...payloadData}=payload;
     return axiosClient.put(`/documents/${id}`, payloadData)
     .then(response => {
         return response.data;
     })
     .catch(err => {
         throw err;
     });
 }
 export function deleteDocument(payload) {
     const {id,...payloadData}=payload;
     return axiosClient.delete(`/documents/${id}`)
     .then(response => {

         return response.data;
     })
     .catch(err => {
         throw err;
     });
 }
 //folderImageMapperFn
  export const folderImageMapperFn = (payload)=>{

     return axiosClient.post(`/documents/folder`, payload)
     .then(response => {

         return response.data;
     })
     .catch(err => {

         throw err;
     });
  }
