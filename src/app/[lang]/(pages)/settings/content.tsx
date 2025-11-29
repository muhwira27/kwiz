'use client';

import React, { useMemo, useState } from 'react';
import { useAuth } from '@/firebase/auth/AuthUserProvider';
import { auth as firebaseAuth } from '@/firebase/config';
import { useParams, useRouter } from 'next/navigation';
import {
  AccountCircle,
  ArrowForwardIosRounded,
  Settings,
} from '@mui/icons-material';
import EditTextModal from './EditTextModal';
import LanguageModal from './LanguageModal';

export default function Content({ settings }: { settings: any }) {
  const auth = useAuth();
  const user = auth.user;
  const { lang } = useParams() as { lang: 'en' | 'id' };
  const router = useRouter();
  const [editing, setEditing] = useState<
    'username' | 'name' | 'email' | 'language' | null
  >(null);
  const [open, setOpen] = useState(false);
  const languageName =
    lang === 'en' ? settings.submenu1.english : settings.submenu1.indonesian;

  const canEditEmail = useMemo(() => {
    // Allow editing if user has password provider linked
    const providers = firebaseAuth.currentUser?.providerData ?? [];
    return providers.some((p) => p.providerId === 'password');
  }, [user?.id]);
  const titles = useMemo(
    () => ({
      username: lang === 'id' ? 'Ubah Username' : 'Edit Username',
      name: lang === 'id' ? 'Ubah Nama' : 'Edit Name',
      email: lang === 'id' ? 'Ubah Email' : 'Edit Email',
      language: lang === 'id' ? 'Ubah Bahasa' : 'Edit Language',
    }),
    [lang]
  );
  const labels = useMemo(
    () => ({
      username: settings.submenu1.username,
      name: settings.submenu1.name,
      email: settings.submenu1.email,
    }),
    [settings]
  );
  const placeholders = useMemo(
    () => ({
      username: lang === 'id' ? 'Masukkan username' : 'Enter username',
      name: lang === 'id' ? 'Masukkan nama' : 'Enter name',
      email: lang === 'id' ? 'Masukkan email' : 'Enter email',
    }),
    [lang]
  );
  const openModal = (field: typeof editing) => {
    setEditing(field);
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
    setEditing(null);
  };
  const handleSave = async (
    value: string,
    opts?: { password?: string }
  ): Promise<string | void> => {
    if (editing === 'username') {
      if (value.length < 3) return 'too-short';
      return await auth.updateUsername(value);
    }
    if (editing === 'name') {
      if (value.length < 2) return 'too-short';
      return await auth.updateName(value);
    }
    if (editing === 'email') {
      return await auth.updateEmailAddress(value, opts?.password);
    }
    return;
  };

  return (
    <div className="mt-2 flex flex-col gap-2 md:flex-row">
      <div className="mb-3 flex h-fit w-full flex-col gap-2 rounded-large bg-white px-6 py-6 shadow-custom1 sm:mt-3 md:mb-5 lg:px-9 lg:py-10">
        <div className="flex items-center gap-2 text-slate-grey">
          <AccountCircle />
          <h3 className="text-base font-semibold ">{settings.submenu1.profile}</h3>
        </div>
        <div className="mt-3 flex w-full flex-col gap-2 space-y-2 px-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 text-base">
              <p className="font-semibold text-gray-800">{settings.submenu1.username}</p>
              <p className="text-gray-400">{user.username ?? '-'}</p>
            </div>
            <button onClick={() => openModal('username')} aria-label="edit-username">
              <ArrowForwardIosRounded
                sx={{ fontSize: { xs: 18, sm: 24, md: 22, lg: 23 } }}
                color="disabled"
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 text-base">
              <p className="font-semibold text-gray-800">{settings.submenu1.name}</p>
              <p className="text-gray-400">{user.name ?? '-'}</p>
            </div>
            <button onClick={() => openModal('name')} aria-label="edit-name">
              <ArrowForwardIosRounded
                sx={{ fontSize: { xs: 18, sm: 24, md: 22, lg: 23 } }}
                color="disabled"
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 text-base">
              <p className="font-semibold text-gray-800">{settings.submenu1.email}</p>
              <p className="text-gray-400">{user.email ?? '-'}</p>
              {!canEditEmail && (
                <p className="text-xs text-gray-400">
                  {lang === 'id' ? (
                    <>
                      Email ditautkan ke akun Google. Jika Anda ingin menggantinya, ganti di{' '}
                      <a
                        href="https://myaccount.google.com/security"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        Google Account
                      </a>
                      .
                    </>
                  ) : (
                    <>
                      Email is linked to your Google account. To change it, go to{' '}
                      <a
                        href="https://myaccount.google.com/security"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        Google Account
                      </a>
                      .
                    </>
                  )}
                </p>
              )}
            </div>
            {canEditEmail ? (
              <button onClick={() => openModal('email')} aria-label="edit-email">
                <ArrowForwardIosRounded
                  sx={{ fontSize: { xs: 18, sm: 24, md: 22, lg: 23 } }}
                  color="disabled"
                />
              </button>
            ) : (
              <span aria-hidden>
                <ArrowForwardIosRounded
                  sx={{ fontSize: { xs: 18, sm: 24, md: 22, lg: 23 } }}
                  color="disabled"
                />
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 text-base">
              <p className="font-semibold text-gray-800">{settings.submenu1.language}</p>
              <p className="text-gray-400">{languageName}</p>
            </div>
            <button onClick={() => openModal('language')} aria-label="edit-language">
              <ArrowForwardIosRounded
                sx={{ fontSize: { xs: 18, sm: 24, md: 22, lg: 23 } }}
                color="disabled"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="mb-3 flex h-fit w-full flex-col gap-2 rounded-large bg-white px-6 py-6 shadow-custom1 sm:mt-3 md:mb-5 lg:px-9 lg:py-10">
        <div className="flex items-center gap-2 text-slate-grey">
          <Settings />
          <h3 className="text-base font-semibold ">{settings.submenu1.account}</h3>
        </div>
        <div className="mt-3 flex w-full flex-col gap-4 space-y-2 px-3">
          <div className="flex items-center justify-between opacity-50">
            <p className="text-base font-semibold text-gray-800">
              {settings.submenu1.password}
            </p>
            <ArrowForwardIosRounded
              sx={{ fontSize: { xs: 18, sm: 24, md: 22, lg: 23 } }}
              color="disabled"
            />
          </div>
          <div className="flex items-center justify-between opacity-50">
            <p className="text-base font-semibold text-gray-800">
              {settings.submenu1.delete}
            </p>
            <ArrowForwardIosRounded
              sx={{ fontSize: { xs: 18, sm: 24, md: 22, lg: 23 } }}
              color="disabled"
            />
          </div>
        </div>
      </div>
      {/* Modals */}
      {editing !== null && editing !== 'language' && (
        <EditTextModal
          open={open}
          lang={lang}
          title={titles[editing]}
          label={labels[editing]}
          initialValue={
            editing === 'username' ? user.username : editing === 'name' ? user.name : user.email
          }
          type={editing === 'email' ? 'email' : 'text'}
          placeholder={placeholders[editing]}
          requirePassword={editing === 'email'}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
      {editing === 'language' && (
        <LanguageModal
          open={open}
          lang={lang}
          englishLabel={settings.submenu1.english}
          indonesianLabel={settings.submenu1.indonesian}
          initialLang={lang}
          onClose={closeModal}
          onSave={(newLang) => {
            router.replace(`/${newLang}/settings`);
          }}
        />
      )}
    </div>
  );
}
