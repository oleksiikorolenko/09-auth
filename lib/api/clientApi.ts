import api from "./api";

import { Note, FetchNotesParams, RawFetchNotesResponse, FetchNotesResponse, NewNoteData } from "@/types/note";


export const fetchNotes = async ({page = 1, perPage = 12, search = '', tag}: FetchNotesParams): Promise<FetchNotesResponse> => {
    const response = await api.get<RawFetchNotesResponse>('/notes', {
        params: {
            page,
            perPage,
            ...(search !== '' && { search }),
            ...(tag && tag !== "All" ? {tag} : {}),
        },
    });

    
    const raw = response.data;
    return {
    page,
    perPage,
    data: raw.notes,
    total_pages: raw.totalPages,
  };
};





export const fetchNoteById = async (id: string): Promise<Note> => {
    const response = await api.get<Note>(`/notes/${id}`);
    return response.data;
};


export const createNote = async (note: NewNoteData): Promise<Note> => {
    const response = await api.post<Note>('/notes', note);
console.log('fetchNotes params:', response.data);
    return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const response = await api.delete<Note>(`/notes/${id}`);
    return response.data;
};

