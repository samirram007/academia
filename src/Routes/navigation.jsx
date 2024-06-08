import  {lazy} from 'react';





const NotFound =  lazy(() => import('../pages/NotFound'));


import {icons} from './icons'
import  {AcademicSessions,CreateAcademicSession,EditAcademicSession}   from '../pages/AcademicSession';
import {Users,CreateUser, EditUser}  from '../pages/User'
import { Campuses, CreateCampus, EditCampus } from '../pages/Campus';
import { Documents } from '../pages/Document';
import { Login } from '../pages/Auth';

import { CreateSchool, EditSchool, Schools } from '../pages/School';
import { CreateSection, EditSection, Sections } from '../pages/Section';
import { CreateDepartment, EditDepartment, Departments } from '../pages/Department';
import { CreateDesignation, EditDesignation, Designations } from '../pages/Designation';
import { Buildings, CreateBuilding, EditBuilding } from '../pages/Building';
import { CreateFloor, EditFloor, Floors } from '../pages/Floor';
import { CreateRoom, EditRoom, Rooms } from '../pages/Room';
import { CreateEducationBoard, EditEducationBoard, EducationBoards } from '../pages/EducationBoard';
import Logout from '../pages/Logout';
import { CreateFee, EditFee, Fees } from '../pages/Fee';
import { CreateFeeReceipt, EditFeeReceipt, FeeReceipts } from '../pages/FeeReceipt';
import { CreateFeeHead, EditFeeHead, FeeHeads } from '../pages/FeeHead';
import { CreateFeeTemplate, EditFeeTemplate, FeeTemplates } from '../pages/FeeTemplate';
import { AcademicStandards, CreateAcademicStandard, EditAcademicStandard } from '../pages/AcademicStandard';
import { AcademicClasses, CreateAcademicClass, EditAcademicClass } from '../pages/AcademicClass';
import { CreateSubject, EditSubject, Subjects } from '../pages/Subject';
import { CreateSubjectGroup, EditSubjectGroup, SubjectGroups } from '../pages/SubjectGroup';
import { CreateStudent, EditStudent, StudentInformation, Students } from '../pages/Student';
import { CreateTeacher, EditTeacher, Teachers } from '../pages/Teacher';
import { Dashboard } from '../pages/Dashboard';
import { CreateSchoolType, EditSchoolType, SchoolTypes } from '../pages/SchoolType';
import { CreateExpenseHead, EditExpenseHead, ExpenseHeads } from '../pages/ExpenseHead';
import { CreateExpense, Expenses,EditExpense } from '../pages/Expense';
import { Admissions, CreateAdmission, EditAdmission } from '../pages/Admission';
import { CreatePromotion, EditPromotion, Promotions } from '../features/Promotion';
import { CreateStudentIdCard, EditStudentIdCard, StudentIdCards } from '../pages/StudentIdCard';


export const common=(module) => {
  return {path: module,      name: module, }
}
export const menuGroup=[
  { name:'GENERAL',visible:false, sort:0},
  { name:'DASHBOARD',visible:false, sort:1},
  { name:'PROFILE',visible:true, sort:2},
  { name:'STUDENT',visible:true, sort:3},
  { name:'TEACHER',visible:true, sort:3},
  { name:'ACADEMICS',visible:true, sort:3},
  { name:'EXAMINATION',visible:true, sort:4},
  { name:'EMPLOYEE',visible:true, sort:5},
  { name:'FEES',visible:true, sort:6},
  { name:'EXPENSE',visible:true, sort:7},
  { name:'REPORT INTERFACE',visible:true, sort:8},
  { name:'STRUCTURE',visible:true, sort:9},
  { name:'SETTINGS',visible:true, sort:10},
  { name:'LOGOUT',visible:false, sort:11},
]
export const page = [

    { path: 'login',      name: 'Login',        element: <Login />,         isMenu: false,  menuGroup:'GENERAL',  isPrivate: false,   icon:icons.login , role:['admin','student'] },
    { path: 'dashboard',  name: 'Dashboard',    element: <Dashboard /> ,    isMenu: true,  menuGroup:'DASHBOARD',   isPrivate: false,   icon:icons.dashboard},
    { path: 'users',      name: 'Users',        element:<Users />,           isMenu: true,  menuGroup:'SETTINGS',   isPrivate: false,   icon:icons.users, role:['admin'],
      children: [
       { path: 'create',  name: 'New',  element: <CreateUser /> ,   isMenu: true,   isPrivate: false,   icon:icons.create_user},
       { path: 'edit/:id',    name: 'Edit User',    element: <EditUser /> ,     isMenu: false,  isPrivate: false,},
      ]
    },
    { path: 'students',      name: 'Students',        element:<Students />,           isMenu: true,  menuGroup:'STUDENT',   isPrivate: false,   icon:icons.users, role:['admin'],
      children: [
       { path: 'create',  name: 'New',  element: <CreateStudent /> ,   isMenu: false,   isPrivate: false,   icon:icons.create_user},
       { path: 'edit/:id',    name: 'Edit Student',    element: <EditStudent /> ,     isMenu: false,  isPrivate: false,},
       { path: 'info/:id',    name: 'User Information',    element: <StudentInformation /> ,     isMenu: false,  isPrivate: false,},
      ]
    },
    { path: 'admissions',      name: 'Admission',        element:<Admissions />,           isMenu: true,  menuGroup:'STUDENT',   isPrivate: false,   icon:icons.users, role:['admin'],
      children: [
       { path: 'create',  name: 'New',  element: <CreateAdmission /> ,   isMenu: false,   isPrivate: false,   icon:icons.create_admission},
       { path: 'edit/:id',    name: 'Edit Admission',    element: <EditAdmission /> ,     isMenu: false,  isPrivate: false,},
      ]
    },
    { path: 'promotions',      name: 'Promotion',        element:<Promotions />,           isMenu: true,  menuGroup:'STUDENT',   isPrivate: false,   icon:icons.users, role:['admin'],
      children: [
       { path: 'create',  name: 'New',  element: <CreatePromotion /> ,   isMenu: false,   isPrivate: false,   icon:icons.create_promotion},
       { path: 'edit/:id',    name: 'Edit Promotion',    element: <EditPromotion /> ,     isMenu: false,  isPrivate: false,},
      ]
    },
    { path: 'student_id_cards',      name: 'Id Card',        element:<StudentIdCards />,           isMenu: true,  menuGroup:'STUDENT',   isPrivate: false,   icon:icons.student_id_card, role:['admin'],
      children: [
       { path: 'create',  name: 'New',  element: <CreateStudentIdCard /> ,   isMenu: false,   isPrivate: false,   icon:icons.create_student_id_card},
       { path: 'edit/:id',    name: 'Edit IdCard',    element: <EditStudentIdCard /> ,     isMenu: false,  isPrivate: false,},
      ]
    },
    { path: 'teachers',      name: 'Teachers',        element:<Teachers />,           isMenu: true,  menuGroup:'TEACHER',   isPrivate: false,   icon:icons.users, role:['admin'],
      children: [
       { path: 'create',  name: 'New',  element: <CreateTeacher /> ,   isMenu: false,   isPrivate: false,   icon:icons.create_user},
       { path: 'edit/:id',    name: 'Edit Teacher',    element: <EditTeacher /> ,     isMenu: false,  isPrivate: false,},
      ]
    },
    { path: 'fees',      name: 'Fee',        element:<Fees />,           isMenu: true,  menuGroup:'FEES',   isPrivate: false,   icon:icons.fees, role:['admin'],
      children: [
       { path: 'create',  name: 'New',  element: <CreateFee /> ,   isMenu: false,   isPrivate: false,   icon:icons.create_fee},
       { path: 'edit/:id',    name: 'Edit Fee',    element: <EditFee /> ,     isMenu: false,  isPrivate: false,},
      ]
    },
    { path: 'fee_receipts',    name: 'Fee Receipts',    element:<FeeReceipts/>,     isMenu: true,   menuGroup:'FEES', isPrivate: false, icon:icons.fee_receipts, role:['admin'],
      children: [
       { path: 'create', name: 'New', element: <CreateFeeReceipt /> ,   isMenu: false, isPrivate: false, icon:icons.create_fee_receipt},
       { path: 'edit/:id', name: 'Edit Fee Receipt', element: <EditFeeReceipt /> ,   isMenu: false, isPrivate: false,},
      ]
    },
    { path: 'fee_heads',    name: 'Fee Heads',    element:<FeeHeads/>,     isMenu: true,   menuGroup:'FEES', isPrivate: false, icon:icons.fee_heads, role:['admin'],
      children: [
       { path: 'create', name: 'New', element: <CreateFeeHead /> ,   isMenu: false, isPrivate: false, icon:icons.create_fee_head},
       { path: 'edit/:id', name: 'Edit Fee Head', element: <EditFeeHead /> ,   isMenu: false, isPrivate: false,},
      ]
    },
    { path: 'fee_templates',    name: 'Fee Templates',    element:<FeeTemplates/>,     isMenu: true,   menuGroup:'FEES', isPrivate: false, icon:icons.fee_templates, role:['admin'],
      children: [
       { path: 'create', name: 'New', element: <CreateFeeTemplate /> ,   isMenu: false, isPrivate: false, icon:icons.create_fee_template},
       { path: 'edit/:id', name: 'Edit Fee Templates', element: <EditFeeTemplate /> ,   isMenu: false, isPrivate: false,},
      ]
    },
    { path: 'expense_heads',    name: 'Expense Heads',    element:<ExpenseHeads/>,     isMenu: true,   menuGroup:'EXPENSE', isPrivate: false, icon:icons.expense_heads, role:['admin'],
      children: [
       { path: 'create', name: 'New', element: <CreateExpenseHead /> ,   isMenu: false, isPrivate: false, icon:icons.create_expense_head},
       { path: 'edit/:id', name: 'Edit Expense Head', element: <EditExpenseHead /> ,   isMenu: false, isPrivate: false,},
      ]
    },
    { path: 'expenses',      name: 'Expense',        element:<Expenses />,           isMenu: true,  menuGroup:'EXPENSE',   isPrivate: false,   icon:icons.expenses, role:['admin'],
    children: [
     { path: 'create',  name: 'New',  element: <CreateExpense /> ,   isMenu: false,   isPrivate: false,   icon:icons.create_expense},
     { path: 'edit/:id',    name: 'Edit Expense',    element: <EditExpense /> ,     isMenu: false,  isPrivate: false,},
    ]
  },
    { path: 'academic_sessions',    name: 'Sessions',    element:<AcademicSessions/>,     isMenu: true,   menuGroup:'ACADEMICS', isPrivate: false, icon:icons.academic_sessions, role:['admin'],
      children: [
       { path: 'create', name: 'New Session', element: <CreateAcademicSession /> ,   isMenu: false, isPrivate: false, icon:icons.create_academic_session},
       { path: 'edit/:id', name: 'Edit Session', element: <EditAcademicSession /> ,   isMenu: false, isPrivate: false,},
      ]
    },
    { path: 'education_boards',    name: 'Education Boards',    element:<EducationBoards/>,     isMenu: true,   menuGroup:'SETTINGS', isPrivate: false, icon:icons.education_boards, role:['admin'],
      children: [
       { path: 'create', name: 'Create Education Board', element: <CreateEducationBoard /> ,   isMenu: false, isPrivate: false, icon:icons.create_education_board},
       { path: 'edit/:id', name: 'Edit Education Board', element: <EditEducationBoard /> ,   isMenu: false, isPrivate: false,},
      ]
    },
    { path: 'school_types',    name: 'School Types',    element:<SchoolTypes/>,     isMenu: true,   menuGroup:'SETTINGS', isPrivate: false, icon:icons.school_types, role:['admin'],
      children: [
       { path: 'create', name: 'Create School Type', element: <CreateSchoolType /> ,   isMenu: false, isPrivate: false, icon:icons.create_school_type},
       { path: 'edit/:id', name: 'Edit School Type', element: <EditSchoolType /> ,   isMenu: false, isPrivate: false,},
      ]
    },
    { path: 'schools',    name: 'Schools',    element:<Schools/>,     isMenu: true,   menuGroup:'SETTINGS', isPrivate: false, icon:icons.schools, role:['admin'],
      children: [
       { path: 'create', name: 'Create School', element: <CreateSchool /> ,   isMenu: false, isPrivate: false, icon:icons.create_school},
       { path: 'edit/:id', name: 'Edit School', element: <EditSchool /> ,   isMenu: false, isPrivate: false,},
      ]
    },
    { path: 'departments',    name: 'Departments',    element:<Departments/>,     isMenu: true,   menuGroup:'SETTINGS', isPrivate: false, icon:icons.departments, role:['admin'],
      children: [
       { path: 'create', name: 'Create Department', element: <CreateDepartment /> ,   isMenu: false, isPrivate: false, icon:icons.create_department},
       { path: 'edit/:id', name: 'Edit Department', element: <EditDepartment /> ,   isMenu: false, isPrivate: false,},
      ]
    },
    { path: 'designations',    name: 'Designations',    element:<Designations/>,     isMenu: true,   menuGroup:'SETTINGS', isPrivate: false, icon:icons.designations, role:['admin'],
      children: [
       { path: 'create', name: 'Create Designation', element: <CreateDesignation /> ,   isMenu: false, isPrivate: false, icon:icons.create_designation},
       { path: 'edit/:id', name: 'Edit Designation', element: <EditDesignation /> ,   isMenu: false, isPrivate: false,},
      ]
    },
    { path: 'academic_standards',    name: 'Standard',    element:<AcademicStandards/>,     isMenu: true,   menuGroup:'ACADEMICS', isPrivate: false, icon:icons.academic_standards, role:['admin'],
      children: [
       { path: 'create', name: 'Create Standard', element: <CreateAcademicStandard /> ,   isMenu: false, isPrivate: false, icon:icons.create_academic_standard},
       { path: 'edit/:id', name: 'Edit Standard', element: <EditAcademicStandard /> ,   isMenu: false, isPrivate: false,},
      ]
    },
    { path: 'academic_classes',    name: 'Classes',    element:<AcademicClasses/>,     isMenu: true,   menuGroup:'ACADEMICS', isPrivate: false, icon:icons.academic_classes, role:['admin'],
      children: [
       { path: 'create', name: 'Create Class', element: <CreateAcademicClass /> ,   isMenu: false, isPrivate: false, icon:icons.create_academic_class},
       { path: 'edit/:id', name: 'Edit Class', element: <EditAcademicClass /> ,   isMenu: false, isPrivate: false,},
      ]
    },
    { path: 'sections',    name: 'Sections',    element:<Sections/>,     isMenu: true,   menuGroup:'ACADEMICS', isPrivate: false, icon:icons.sections, role:['admin'],
      children: [
       { path: 'create', name: 'Create Section', element: <CreateSection /> ,   isMenu: false, isPrivate: false, icon:icons.create_section},
       { path: 'edit/:id', name: 'Edit Section', element: <EditSection /> ,   isMenu: false, isPrivate: false,},
      ]
    },
    { path: 'subject_groups',    name: 'Subject Groups',    element:<SubjectGroups/>,     isMenu: true,   menuGroup:'ACADEMICS', isPrivate: false, icon:icons.subject_groups, role:['admin'],
      children: [
       { path: 'create', name: 'Create Subject Group', element: <CreateSubjectGroup /> ,   isMenu: false, isPrivate: false, icon:icons.create_subject_group},
       { path: 'edit/:id', name: 'Edit Subject Group', element: <EditSubjectGroup /> ,   isMenu: false, isPrivate: false,},
      ]
    },
    { path: 'subjects',    name: 'Subjects',    element:<Subjects/>,     isMenu: true,   menuGroup:'ACADEMICS', isPrivate: false, icon:icons.subjects, role:['admin'],
      children: [
       { path: 'create', name: 'Create Subject', element: <CreateSubject /> ,   isMenu: false, isPrivate: false, icon:icons.create_subject},
       { path: 'edit/:id', name: 'Edit Subject', element: <EditSubject /> ,   isMenu: false, isPrivate: false,},
      ]
    },
    { path: 'campuses',    name: 'Campuses',    element:<Campuses/>,     isMenu: true,   menuGroup:'SETTINGS', isPrivate: false, icon:icons.campuses, role:['admin'],
      children: [
       { path: 'create', name: 'Create Campus', element: <CreateCampus /> ,   isMenu: false, isPrivate: false, icon:icons.create_campus},
       { path: 'edit/:id', name: 'Edit Campus', element: <EditCampus /> ,   isMenu: false, isPrivate: false,},
      ]
    },
    { path: 'buildings',    name: 'Buildings',    element:<Buildings/>,     isMenu: true,   menuGroup:'STRUCTURE', isPrivate: false, icon:icons.buildings, role:['admin'],
    children: [
     { path: 'create', name: 'Create Building', element: <CreateBuilding /> ,   isMenu: false, isPrivate: false, icon:icons.create_building},
     { path: 'edit/:id', name: 'Edit Building', element: <EditBuilding /> ,   isMenu: false, isPrivate: false,},
    ]
    },
    { path: 'floors',    name: 'Floors',    element:<Floors/>,     isMenu: true,   menuGroup:'STRUCTURE', isPrivate: false, icon:icons.floors, role:['admin'],
    children: [
     { path: 'create', name: 'Create Floor', element: <CreateFloor /> ,   isMenu: false, isPrivate: false, icon:icons.create_floor},
     { path: 'edit/:id', name: 'Edit Floor', element: <EditFloor /> ,   isMenu: false, isPrivate: false,},
    ]
    },
    { path: 'rooms',    name: 'Rooms',    element:<Rooms/>,     isMenu: true,   menuGroup:'STRUCTURE', isPrivate: false, icon:icons.rooms, role:['admin'],
    children: [
     { path: 'create', name: 'Create Room', element: <CreateRoom /> ,   isMenu: false, isPrivate: false, icon:icons.create_room},
     { path: 'edit/:id', name: 'Edit Room', element: <EditRoom /> ,   isMenu: false, isPrivate: false,},
    ]
    },
    { path: 'documents',  name: 'Documents',  element: <Documents />,   isMenu: true,   menuGroup:'SETTINGS', isPrivate: false },
    { path: 'logout',  name: 'Logout',  element: <Logout/>,   isMenu: true,   menuGroup:'LOGOUT', isPrivate: false,icon:icons.logout },

    { path: '*', name: 'NotFound', element: <NotFound />, isMenu: false, isPrivate: false },

  ]