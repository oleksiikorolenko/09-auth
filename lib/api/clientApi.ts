import { api } from "./api";

import { Note, FetchNotesParams, RawFetchNotesResponse, FetchNotesResponse, NewNoteData, LoginRequestData, RegisterRequestData, User, UpdateUserRequest, CheckSessionRequet} from "@/types/note";


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


export const login = async (payload: LoginRequestData) => {
    const response = await api.post<User>("/auth/login", payload);
    return response.data;
};


export const register = async (payload: RegisterRequestData) => {
    const response = await api.post<User>("/auth/register", payload);
    return response.data;
};


export const logout = async (): Promise<void> => {
    await api.post("/auth/logout");
};



export const getMe = async () => {
    const response = await api.get<User>("/users/me");
    return response.data;
};


export const updateMe = async (username: UpdateUserRequest) => {
    const response = await api.patch<User>("/users/me", username);
    return response.data;
};

export const checkSession = async () => {
    const response = await api.get<CheckSessionRequet>("/auth/session");
    return response.data.success;
};



