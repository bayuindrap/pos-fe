import { element } from 'prop-types';
import React from 'react';
import UserList from './views/pages//page/data/userList';
import TemaQuiz from './views/pages/page/pengaturan/temaQuiz';
import RecordPasien from './views/pages/page/recordPasien';
import JawabanSurveyDetail from './views/pages/page/detail/detailJawabanSurveyPasien';

const Dashboard = React.lazy(() => import('./views/pages/page/asd'));



// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'));
const Logins = React.lazy(() => import('./views/pages/login/Login'));

// export const adminRoutes = [
//   { path: '/dashboard', name: 'Dashboard', element: Dashboard },
//   { path: '/login', name: 'Login', element: Logins },
//   { path: '/dashboardPerawat', name: 'Dashboard', element: DashboardPerawat },
//   { path: '/jumlahPasien', name: 'Jumlah Pasien', element: JumlahPasien },
//   {
//     path: '/jumlahPasienPerawat',
//     name: 'Jumlah Pasien',
//     element: JumlahPasienPrwt,
//   },
//   {
//     path: '/jumlahKunjungan',
//     name: 'Jumlah Kunjungan',
//     element: JumlahKunjungan,
//   },
//   { path: '/jumlahKeluhan', name: 'Jumlah Keluhan', element: JumlahKeluhan },
//   {
//     path: '/jumlahKeluhanPerawat',
//     name: 'Jumlah Keluhan',
//     element: JumlahKeluhanPrwt,
//   },
//   { path: '/jumlahTindakan', name: 'Jumlah Tindakan', element: JumlahTindakan },
//   { path: '/jumlahPerawat', name: 'Jumlah Perawat', element: JumlahPerawat },
//   { path: '/saranWawasan', name: 'Saran Wawasan', element: SaranWawasan },
//   { path: '/diskusi', name: 'Diskusi', element: Diskusi },
//   { path: '/obatPasien', name: 'Obat Pasien', element: ObatPasien },
//   { path: '/obatPasienPerawat', name: 'Obat Pasien', element: ObatPasienPrwt },
//   {
//     path: '/detailKeluarga/:id',
//     name: 'Detail Keluarga',
//     element: DetailKeluarga,
//   },
//   {
//     path: '/detailPasien/:id/:stat',
//     name: 'Detail Data Pasien',
//     element: DetailDataPasien,
//   },
//   { path: '/pasienDetail/:id', name: 'Detail Pasien', element: DetailPasien },
//   { path: '/detailObat', name: 'Detail Obat', element: DetailObat },
//   { path: '/dataPasien', name: 'Login', element: DataPasien },
//   { path: '/dataUser', name: 'Data User', element: ListUser },
//   { path: '/addPasien', name: 'Registrasi User', element: AddPasien },
//   { path: '/addPerawat', name: 'Registrasi User', element: AddPerawat },
//   { path: '/editObat', name: 'Edit Obat', element: EditObat },
//   { path: '/formDetailPasien', name: 'Detail Pasien', element: DetailPasien },
//   { path: '/addKunjungan', name: 'Tambah Kunjungan', element: TambahKunjungan },
//   {
//     path: '/detailKunjungan',
//     name: 'Detail Kunjungan',
//     element: DetailJumlahKunjungan,
//   },
//   { path: '/detailTindakan', name: 'Detail Tindakan', element: DetailTindakan },
//   { path: '/detailKeluhan', name: 'Detail Keluhan', element: DetailKeluhan },
//   { path: '/addTindakan', name: 'Tambah Tindakan', element: TambahTindakan },
//   { path: '/addKeluhan', name: 'Tambah Keluhan', element: TambahKeluhan },
//   { path: '/addObat', name: 'Tambah Obat', element: TambahObat },
//   { path: '/jumlahObat', name: 'Jumlah Obat', element: JumlahObat },
//   { path: '/addUser', name: 'Registrasi User', element: AddUser },
//   { path: '/obat', name: 'Jumlah Obat', element: DetailObat },
//   {
//     path: '/detailObatPasien/:id',
//     name: 'Detail Obat Pasien',
//     element: DetailJumlahObat,
//   },
//   {
//     path: '/pasienBaik/:id',
//     name: 'Data Pasien Baik',
//     element: DataPasienBaik,
//   },
//   {
//     path: '/jumlahResult',
//     name: 'Jumlah Data Result',
//     element: JumlahDataResult,
//   },
//   { path: '/jumlahSurvey/:id', name: 'Jumlah Survey', element: JumlahSurvey },
//   { path: '/survey', name: 'Survey', element: JenisSurvey },
//   { path: '/keluarga', name: 'List Keluarga', element: JumlahKeluarga },
//   { path: '/addKeluarga', name: 'Add Keluarga', element: AddKeluarga },
//   { path: '/quiz', name: 'Quiz', element: Quiz },
//   {
//     path: '/pengaturanKunjungan',
//     name: 'Pengaturan Kunjungan',
//     element: PengaturanKunjungan,
//   },
//   {
//     path: '/pengaturanPasien',
//     name: 'Pengaturan Pasien',
//     element: PengaturanPasien,
//   },
//   {
//     path: '/pengaturanPerawat',
//     name: 'Pengaturan Perawat',
//     element: PengaturanPerawat,
//   },
//   {
//     path: '/pengaturanKeluhan',
//     name: 'Pengaturan Keluhan',
//     element: PengaturanKeluhan,
//   },
//   {
//     path: '/pengaturanEducation',
//     name: 'Pengaturan Education',
//     element: PengaturanEducation,
//   },
//   {
//     path: '/pengaturanKeluarga',
//     name: 'Pengaturan Keluarga',
//     element: PengaturanKeluarga,
//   },
//   {
//     path: '/pengaturanRecords',
//     name: 'Pengaturan Records',
//     element: PengaturanRecords,
//   },
//   { path: '/addVisit', name: 'Tambah Kunjungan', element: AddKunjungan },
//   { path: '/addRecords', name: 'Tambah Records', element: AddRecords },
//   { path: '/addCatMed', name: 'Tambah Kategori Obat', element: AddCatObat },
//   {
//     path: '/addMedPatient',
//     name: 'Tambah Obat Untuk Pasien',
//     element: AddObatPasien,
//   },
//   { path: '/addEducation', name: 'Tambah Education', element: AddEducation },
//   { path: '/levelQuiz', name: 'Level Quiz', element: PengaturanLevel },
//   { path: '/temaQuiz', name: 'Tema Quiz', element: PengaturanTema },
//   {
//     path: '/addPertanyaan',
//     name: 'Add Pertanyaan Survey',
//     element: AddPertanyaan,
//   },
//   { path: '/addSurvey', name: 'Add Survey', element: AddSurvey },
//   { path: '/key', name: 'Add Key', element: PageKey },
//   { path: '/keyDetail/:id', name: 'Key Detail', element: DetailKey },
//   { path: '/recordsPasien', name: 'History Pasien', element: PasienRecords },
//   { path: '/recordsPasienAll/:id', name: 'History Pasien', element: PasienRecordsAll },
//   { path: '/surveyPasienAll', name: 'Survey Pasien', element: PasienSurveyAll },
//   { path: '/jawabanQuiz', name: 'Jawaban Quiz', element: JawabanQuiz },
//   { path: '/jawabanQuizDetail/:id', name: 'Jawaban Quiz Detail', element: JawabanQuizDetail },
//   { path: '/jawabanSurveyPasien', name: 'Jawaban Survey Pasien', element: JawabanSurveyPasien },
//   { path: '/jawabanSurveyDetail/:id', name: 'Jawaban Survey Pasien Detail', element: JawabanSurveyPasienDetail },
//   { path: '/jawabanSurveyKeluarga', name: 'Jawaban Survey Keluarga', element: JawabanSurveyKeluarga },
//   { path: '/jawabanSurveyFamDetail/:id', name: 'Jawaban Survey Keluarga Detail', element: JawabanSurveyKeluargaDetail },
//   { path: '/login', name: 'Login', element: LoginPage },
//   { path: '/error', name: 'Unknown', element: Page404 },
// ];
// export const perawatRoutes = [
//   { path: '/login', name: 'Login', element: Logins },
//   { path: '/dashboard', name: 'Dashboard', element: Dashboard },
//   { path: '/dashboardPerawat', name: 'Dashboard', element: DashboardPerawat },
//   { path: '/jumlahPasien', name: 'Jumlah Pasien', element: JumlahPasien },
//   {
//     path: '/jumlahPasienPerawat',
//     name: 'Jumlah Pasien',
//     element: JumlahPasienPrwt,
//   },
//   {
//     path: '/jumlahKunjungan',
//     name: 'Jumlah Kunjungan',
//     element: JumlahKunjungan,
//   },
//   { path: '/jumlahKeluhan', name: 'Jumlah Keluhan', element: JumlahKeluhan },
//   {
//     path: '/jumlahKeluhanPerawat',
//     name: 'Jumlah Keluhan',
//     element: JumlahKeluhanPrwt,
//   },
//   { path: '/jumlahTindakan', name: 'Jumlah Tindakan', element: JumlahTindakan },
//   { path: '/jumlahPerawat', name: 'Jumlah Perawat', element: JumlahPerawat },
//   { path: '/obatPasien', name: 'Obat Pasien', element: ObatPasien },
//   { path: '/obatPasienPerawat', name: 'Obat Pasien', element: ObatPasienPrwt },
//   {
//     path: '/detailKeluarga/:id',
//     name: 'Detail Keluarga',
//     element: DetailKeluarga,
//   },
//   {
//     path: '/detailPasien/:id/:stat',
//     name: 'Detail Data Pasien',
//     element: DetailDataPasien,
//   },
//   { path: '/pasienDetail/:id', name: 'Detail Pasien', element: DetailPasien },
//   { path: '/detailObat', name: 'Detail Obat', element: DetailObat },
//   { path: '/dataPasien', name: 'Login', element: DataPasien },
//   { path: '/dataUser', name: 'Data User', element: ListUser },
//   { path: '/addPasien', name: 'Registrasi User', element: AddPasien },
//   { path: '/editObat', name: 'Edit Obat', element: EditObat },
//   { path: '/formDetailPasien', name: 'Detail Pasien', element: DetailPasien },
//   { path: '/addKunjungan', name: 'Tambah Kunjungan', element: TambahKunjungan },
//   {
//     path: '/detailKunjungan',
//     name: 'Detail Kunjungan',
//     element: DetailJumlahKunjungan,
//   },
//   { path: '/detailTindakan', name: 'Detail Tindakan', element: DetailTindakan },
//   { path: '/detailKeluhan', name: 'Detail Keluhan', element: DetailKeluhan },
//   { path: '/addTindakan', name: 'Tambah Tindakan', element: TambahTindakan },
//   { path: '/addKeluhan', name: 'Tambah Keluhan', element: TambahKeluhan },
//   { path: '/addObat', name: 'Tambah Obat', element: TambahObat },
//   { path: '/jumlahObat', name: 'Jumlah Obat', element: JumlahObat },
//   { path: '/obat', name: 'Jumlah Obat', element: DetailObat },
//   {
//     path: '/detailObatPasien/:id',
//     name: 'Detail Obat Pasien',
//     element: DetailJumlahObat,
//   },
//   {
//     path: '/pasienBaik/:id',
//     name: 'Data Pasien Baik',
//     element: DataPasienBaik,
//   },
//   {
//     path: '/jumlahResult',
//     name: 'Jumlah Data Result',
//     element: JumlahDataResult,
//   },
//   { path: '/jumlahSurvey/:id', name: 'Jumlah Survey', element: JumlahSurvey },
//   { path: '/jenisSurvey', name: 'Jenis Survey', element: JenisSurvey },
//   { path: '/keluarga', name: 'List Keluarga', element: JumlahKeluarga },
//   { path: '/addKeluarga', name: 'Add Keluarga', element: AddKeluarga },
//   { path: '/quiz', name: 'Quiz', element: Quiz },
//   {
//     path: '/pengaturanKunjungan',
//     name: 'Pengaturan Kunjungan',
//     element: PengaturanKunjungan,
//   },
//   {
//     path: '/pengaturanPasien',
//     name: 'Pengaturan Pasien',
//     element: PengaturanPasien,
//   },
//   {
//     path: '/pengaturanPerawat',
//     name: 'Pengaturan Perawat',
//     element: PengaturanPerawat,
//   },
//   {
//     path: '/pengaturanKeluhan',
//     name: 'Pengaturan Keluhan',
//     element: PengaturanKeluhan,
//   },
//   {
//     path: '/pengaturanEducation',
//     name: 'Pengaturan Education',
//     element: PengaturanEducation,
//   },
//   {
//     path: '/pengaturanKeluarga',
//     name: 'Pengaturan Keluarga',
//     element: PengaturanKeluarga,
//   },
//   { path: '/addVisit', name: 'Tambah Kunjungan', element: AddKunjungan },
//   { path: '/addCatMed', name: 'Tambah Kategori Obat', element: AddCatObat },
//   {
//     path: '/addMedPatient',
//     name: 'Tambah Obat Untuk Pasien',
//     element: AddObatPasien,
//   },
//   { path: '/addEducation', name: 'Tambah Education', element: AddEducation },
//   { path: '/levelQuiz', name: 'Level Quiz', element: PengaturanLevel },
//   { path: '/temaQuiz', name: 'Tema Quiz', element: PengaturanTema },
//   { path: '/recordsPasien', name: 'History Pasien Terbaru', element: PasienRecords },
//   { path: '/recordsPasienAll/:id', name: 'History Pasien', element: PasienRecordsAll },
//   { path: '/surveyPasienAll', name: 'Survey Pasien', element: PasienSurveyAll },
//   { path: '/jawabanQuiz', name: 'Jawaban Quiz', element: JawabanQuiz },
//   { path: '/jawabanQuizDetail/:id', name: 'Jawaban Quiz Detail', element: JawabanQuizDetail },
//   { path: '/jawabanSurveyDetail/:id', name: 'Jawaban Survey Pasien Detail', element: JawabanSurveyPasienDetail },
//   { path: '/jawabanSurveyKeluarga', name: 'Jawaban Survey Keluarga', element: JawabanSurveyKeluarga },
//   { path: '/jawabanSurveyFamDetail/:id', name: 'Jawaban Survey Keluarga Detail', element: JawabanSurveyKeluargaDetail },
//   { path: '/login', name: 'Login', element: LoginPage },
//   { path: '/error', name: 'Unknown', element: Page404 },
// ];

export const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
];

// export default routes
