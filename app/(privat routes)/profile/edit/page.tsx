'use client'

import css from "./EditProfilePage.module.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";


export default function EditProfile() {
  const user = useAuthStore((state) => state.user);
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSaveUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateMe({ username });
    router.push("/profile");
  };

  const handleBack = () => {
    router.back();
  };
    
  
  return (
        <main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

    <Image src="avatar"
      alt="User Avatar"
      width={120}
      height={120}
      className={css.avatar}
    />

    <form onSubmit={handleSaveUser} className={css.profileInfo}>
      <div className={css.usernameWrapper}>
        <label htmlFor="username">Username:</label>
        <input id="username"
              type="text"
              value={username}
              className={css.input}
              onChange={handleChange}
        />
      </div>

      <p>Email: </p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
            <button type="button" className={css.cancelButton}
            onClick={handleBack}>
          Cancel
        </button>
      </div>
    </form>
  </div>
</main>
    )
}