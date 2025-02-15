


import {
    AcademicSessions,
    CreateAcademicSession,
    EditAcademicSession,
} from "../pages/AcademicSession";
import { Login } from "../pages/Auth";
import { Campuses, CreateCampus, EditCampus } from "../pages/Campus";
import { Documents } from "../pages/Document";
import { CreateUser, EditUser, Users } from "../pages/User";
import { icons } from "./icons";

import { Examinations } from "@/pages/Examination";
import {
    CreatePromotion,
    EditPromotion,
    Promotions,
} from "../features/Promotion";
import {
    DailyCollectionReport,
    MonthlyCollectionReport,
} from "../features/Report";
import {
    AcademicClasses,
    CreateAcademicClass,
    EditAcademicClass,
} from "../pages/AcademicClass";
import {
    AcademicStandards,
    CreateAcademicStandard,
    EditAcademicStandard,
} from "../pages/AcademicStandard";
import { Admissions, CreateAdmission, EditAdmission } from "../pages/Admission";
import { Buildings, CreateBuilding, EditBuilding } from "../pages/Building";
import { Dashboard } from "../pages/Dashboard";
import {
    CreateDepartment,
    Departments,
    EditDepartment,
} from "../pages/Department";
import {
    CreateDesignation,
    Designations,
    EditDesignation,
} from "../pages/Designation";
import {
    CreateEducationBoard,
    EditEducationBoard,
    EducationBoards,
} from "../pages/EducationBoard";
import { CreateExpense, EditExpense, Expenses } from "../pages/Expense";
import {
    CreateExpenseGroup,
    EditExpenseGroup,
    ExpenseGroups,
} from "../pages/ExpenseGroup";
import {
    CreateExpenseHead,
    EditExpenseHead,
    ExpenseHeads,
} from "../pages/ExpenseHead";
import { CreateFee, EditFee, Fees } from "../pages/Fee";
import { CreateFeeHead, EditFeeHead, FeeHeads } from "../pages/FeeHead";
import {
    CreateFeeReceipt,
    EditFeeReceipt,
    FeeReceipts,
} from "../pages/FeeReceipt";
import {
    CreateFeeTemplate,
    EditFeeTemplate,
    FeeTemplates,
} from "../pages/FeeTemplate";
import { CreateFloor, EditFloor, Floors } from "../pages/Floor";
import HomePage from "../pages/HomePage";
import {
    CreateIncomeGroup,
    EditIncomeGroup,
    IncomeGroups,
} from "../pages/IncomeGroup";
import Logout from "../pages/Logout";
import NotFound from "../pages/NotFound";
import { CreateRoom, EditRoom, Rooms } from "../pages/Room";
import { CreateSchool, EditSchool, Schools } from "../pages/School";
import {
    CreateSchoolType,
    EditSchoolType,
    SchoolTypes,
} from "../pages/SchoolType";
import { CreateSection, EditSection, Sections } from "../pages/Section";
import {
    CreateStudent,
    EditStudent,
    StudentInformation,
    Students,
} from "../pages/Student";
import {
    CreateStudentIdCard,
    EditStudentIdCard,
    StudentIdCards,
} from "../pages/StudentIdCard";
import { CreateSubject, EditSubject, Subjects } from "../pages/Subject";
import {
    CreateSubjectGroup,
    EditSubjectGroup,
    SubjectGroups,
} from "../pages/SubjectGroup";
import { CreateTeacher, EditTeacher, Teachers } from "../pages/Teacher";
import { CreateTransport, EditTransport, Transports } from "../pages/Transport";
import {
    CreateTransportExpense,
    EditTransportExpense,
    TransportExpenses,
} from "../pages/TransportExpense";
import {
    CreateTransportFee,
    EditTransportFee,
    TransportFees,
} from "../pages/TransportFee";
import {
    CreateTransportSlot,
    EditTransportSlot,
    TransportSlots,
} from "../pages/TransportSlot";
import {
    CreateTransportTeam,
    EditTransportTeam,
    TransportTeams,
} from "../pages/TransportTeam";
import {
    CreateTransportUser,
    EditTransportUser,
    TransportUsers,
} from "../pages/TransportUser";

export const common = (module) => {
    return { path: module, name: module };
};
export const menuGroup = [
    { name: "GENERAL", visible: false, sort: 0 },
    { name: "DASHBOARD", visible: false, sort: 1 },
    { name: "PROFILE", visible: true, sort: 2 },
    { name: "STUDENT", visible: true, sort: 3 },
    { name: "TEACHER", visible: true, sort: 3 },
    { name: "ACADEMICS", visible: true, sort: 3 },
    { name: "EXAMINATION", visible: true, sort: 4 },
    { name: "EMPLOYEE", visible: true, sort: 5 },
    { name: "FEES", visible: true, sort: 6 },
    { name: "EXPENSE", visible: true, sort: 7 },
    { name: "TRANSPORT", visible: false, sort: 8 },
    { name: "REPORT INTERFACE", visible: true, sort: 9 },
    { name: "STRUCTURE", visible: true, sort: 10 },
    { name: "SETTINGS", visible: true, sort: 11 },
    { name: "LOGOUT", visible: false, sort: 12 },
];
export const quickMenuGroup = [
    { name: "QuickAccessMenu1", visible: true, sort: 0 },
]
export const page = [
    {
        path: "index",
        name: "Home",
        element: <HomePage />,
        isMenu: false,
        menuGroup: "GENERAL",
        isPrivate: false,
        authType: false,
        icon: icons.login,
        role: ["guest"],
    },
    {
        path: "login",
        name: "Login",
        element: <Login />,
        isMenu: false,
        menuGroup: "GENERAL",
        isPrivate: false,
        authType: false,
        icon: icons.login,
        role: ["admin", "student"],
    },
    {
        path: "dashboard",
        name: "Dashboard",
        element: <Dashboard />,
        isMenu: true,
        menuGroup: "DASHBOARD",
        isPrivate: true, authType: true,
        icon: icons.dashboard,
        role: ["admin", "student"],
    },
    {
        path: "users",
        name: "Users",
        element: <Users />,
        isMenu: true,
        menuGroup: "SETTINGS",
        isPrivate: true, authType: true,
        icon: icons.users,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "New",
                element: <CreateUser />,
                isMenu: true,
                isPrivate: true, authType: true,
                icon: icons.create_user,
            },
            {
                path: "edit/:id",
                name: "Edit User",
                element: <EditUser />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "students",
        name: "Students",
        element: <Students />,
        isMenu: true,
        menuGroup: "STUDENT",
        isPrivate: true, authType: true,
        icon: icons.users,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "New",
                element: <CreateStudent />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_user,
                quickMenuGroup: "QuickAccessMenu1"
            },
            {
                path: "edit/:id",
                name: "Edit Student",
                element: <EditStudent />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
            {
                path: "info/:id",
                name: "User Information",
                element: <StudentInformation />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "admissions",
        name: "Admission",
        element: <Admissions />,
        isMenu: false,
        menuGroup: "STUDENT",
        isPrivate: true, authType: true,
        icon: icons.users,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "New",
                element: <CreateAdmission />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_admission,
            },
            {
                path: "edit/:id",
                name: "Edit Admission",
                element: <EditAdmission />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "promotions",
        name: "Promotion",
        element: <Promotions />,
        isMenu: true,
        menuGroup: "STUDENT",
        isPrivate: true, authType: true,
        icon: icons.users,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "New",
                element: <CreatePromotion />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_promotion,
            },
            {
                path: "edit/:id",
                name: "Edit Promotion",
                element: <EditPromotion />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "student_id_cards",
        name: "Id Card",
        element: <StudentIdCards />,
        isMenu: true,
        menuGroup: "STUDENT",
        isPrivate: true, authType: true,
        icon: icons.student_id_card,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "New",
                element: <CreateStudentIdCard />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_student_id_card,
                quickMenuGroup: "QuickAccessMenu1"
            },
            {
                path: "edit/:id",
                name: "Edit IdCard",
                element: <EditStudentIdCard />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "teachers",
        name: "Teachers",
        element: <Teachers />,
        isMenu: true,
        menuGroup: "TEACHER",
        isPrivate: true, authType: true,
        icon: icons.users,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "New",
                element: <CreateTeacher />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_user,
            },
            {
                path: "edit/:id",
                name: "Edit Teacher",
                element: <EditTeacher />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "fees",
        name: "Fee",
        element: <Fees />,
        isMenu: true,
        menuGroup: "FEES",
        isPrivate: true, authType: true,
        icon: icons.fees,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "New",
                element: <CreateFee />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_fee,
            },
            {
                path: "edit/:id",
                name: "Edit Fee",
                element: <EditFee />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "fee_receipts",
        name: "Fee Receipts",
        element: <FeeReceipts />,
        isMenu: false,
        menuGroup: "FEES",
        isPrivate: true, authType: true,
        icon: icons.fee_receipts,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "New",
                element: <CreateFeeReceipt />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_fee_receipt,
            },
            {
                path: "edit/:id",
                name: "Edit Fee Receipt",
                element: <EditFeeReceipt />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "fee_heads",
        name: "Fee Heads",
        element: <FeeHeads />,
        isMenu: true,
        menuGroup: "FEES",
        isPrivate: true, authType: true,
        icon: icons.fee_heads,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "New",
                element: <CreateFeeHead />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_fee_head,
            },
            {
                path: "edit/:id",
                name: "Edit Fee Head",
                element: <EditFeeHead />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "income_groups",
        name: "Income Groups",
        element: <IncomeGroups />,
        isMenu: true,
        menuGroup: "FEES",
        isPrivate: true, authType: true,
        icon: icons.income_groups,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "New",
                element: <CreateIncomeGroup />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_income_group,
            },
            {
                path: "edit/:id",
                name: "Edit Income Group",
                element: <EditIncomeGroup />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "fee_templates",
        name: "Fee Templates",
        element: <FeeTemplates />,
        isMenu: true,
        menuGroup: "FEES",
        isPrivate: true, authType: true,
        icon: icons.fee_templates,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "New",
                element: <CreateFeeTemplate />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_fee_template,
            },
            {
                path: "edit/:id",
                name: "Edit Fee Templates",
                element: <EditFeeTemplate />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "expense_heads",
        name: "Expense Heads",
        element: <ExpenseHeads />,
        isMenu: true,
        menuGroup: "EXPENSE",
        isPrivate: true, authType: true,
        icon: icons.expense_heads,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "New",
                element: <CreateExpenseHead />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_expense_head,
            },
            {
                path: "edit/:id",
                name: "Edit Expense Head",
                element: <EditExpenseHead />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "expense_groups",
        name: "Expense Groups",
        element: <ExpenseGroups />,
        isMenu: true,
        menuGroup: "EXPENSE",
        isPrivate: true, authType: true,
        icon: icons.expense_groups,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "New",
                element: <CreateExpenseGroup />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_expense_group,
            },
            {
                path: "edit/:id",
                name: "Edit Expense Group",
                element: <EditExpenseGroup />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "expenses",
        name: "Expense",
        element: <Expenses />,
        isMenu: true,
        menuGroup: "EXPENSE",
        isPrivate: true, authType: true,
        icon: icons.expenses,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "New",
                element: <CreateExpense />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_expense,
            },
            {
                path: "edit/:id",
                name: "Edit Expense",
                element: <EditExpense />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "transports",
        name: "Transport",
        element: <Transports />,
        isMenu: false,
        menuGroup: "TRANSPORT",
        isPrivate: true, authType: true,
        icon: icons.transports,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "New",
                element: <CreateTransport />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_transports,
            },
            {
                path: "edit/:id",
                name: "Edit Transport",
                element: <EditTransport />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },

    {
        path: "transport_teams",
        name: "Working Team",
        element: <TransportTeams />,
        isMenu: false,
        menuGroup: "TRANSPORT",
        isPrivate: true, authType: true,
        icon: icons.transport_teams,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "New",
                element: <CreateTransportTeam />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_transport_teams,
            },
            {
                path: "edit/:id",
                name: "Edit Transport Team",
                element: <EditTransportTeam />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "transport_slots",
        name: "Journey Slot",
        element: <TransportSlots />,
        isMenu: false,
        menuGroup: "TRANSPORT",
        isPrivate: true, authType: true,
        icon: icons.transport_slots,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "New",
                element: <CreateTransportSlot />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_transport_slots,
            },
            {
                path: "edit/:id",
                name: "Edit Journey Slot",
                element: <EditTransportSlot />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "transport_users",
        name: "Traveler",
        element: <TransportUsers />,
        isMenu: false,
        menuGroup: "TRANSPORT",
        isPrivate: true, authType: true,
        icon: icons.transport_users,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "New",
                element: <CreateTransportUser />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_transport_users,
            },
            {
                path: "edit/:id",
                name: "Edit Transport User",
                element: <EditTransportUser />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },

    {
        path: "transport_fees",
        name: "Fee",
        element: <TransportFees />,
        isMenu: false,
        menuGroup: "TRANSPORT",
        isPrivate: true, authType: true,
        icon: icons.transport_fees,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "New",
                element: <CreateTransportFee />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_transport_fees,
            },
            {
                path: "edit/:id",
                name: "Edit Transport Fee",
                element: <EditTransportFee />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "transport_expenses",
        name: "Expense",
        element: <TransportExpenses />,
        isMenu: false,
        menuGroup: "TRANSPORT",
        isPrivate: true, authType: true,
        icon: icons.transport_expenses,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "New",
                element: <CreateTransportExpense />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_transport_expenses,
            },
            {
                path: "edit/:id",
                name: "Edit Transport Expense",
                element: <EditTransportExpense />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "academic_sessions",
        name: "Sessions",
        element: <AcademicSessions />,
        isMenu: true,
        menuGroup: "ACADEMICS",
        isPrivate: true, authType: true,
        icon: icons.academic_sessions,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "New Session",
                element: <CreateAcademicSession />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_academic_session,
            },
            {
                path: "edit/:id",
                name: "Edit Session",
                element: <EditAcademicSession />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "education_boards",
        name: "Education Boards",
        element: <EducationBoards />,
        isMenu: true,
        menuGroup: "SETTINGS",
        isPrivate: true, authType: true,
        icon: icons.education_boards,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "Create Education Board",
                element: <CreateEducationBoard />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_education_board,
            },
            {
                path: "edit/:id",
                name: "Edit Education Board",
                element: <EditEducationBoard />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "school_types",
        name: "School Types",
        element: <SchoolTypes />,
        isMenu: true,
        menuGroup: "SETTINGS",
        isPrivate: true, authType: true,
        icon: icons.school_types,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "Create School Type",
                element: <CreateSchoolType />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_school_type,
            },
            {
                path: "edit/:id",
                name: "Edit School Type",
                element: <EditSchoolType />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "schools",
        name: "Schools",
        element: <Schools />,
        isMenu: true,
        menuGroup: "SETTINGS",
        isPrivate: true, authType: true,
        icon: icons.schools,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "Create School",
                element: <CreateSchool />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_school,
            },
            {
                path: "edit/:id",
                name: "Edit School",
                element: <EditSchool />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "departments",
        name: "Departments",
        element: <Departments />,
        isMenu: true,
        menuGroup: "SETTINGS",
        isPrivate: true, authType: true,
        icon: icons.departments,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "Create Department",
                element: <CreateDepartment />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_department,
            },
            {
                path: "edit/:id",
                name: "Edit Department",
                element: <EditDepartment />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "designations",
        name: "Designations",
        element: <Designations />,
        isMenu: true,
        menuGroup: "SETTINGS",
        isPrivate: true, authType: true,
        icon: icons.designations,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "Create Designation",
                element: <CreateDesignation />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_designation,
            },
            {
                path: "edit/:id",
                name: "Edit Designation",
                element: <EditDesignation />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "academic_standards",
        name: "Standard",
        element: <AcademicStandards />,
        isMenu: true,
        menuGroup: "ACADEMICS",
        isPrivate: true, authType: true,
        icon: icons.academic_standards,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "Create Standard",
                element: <CreateAcademicStandard />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_academic_standard,
            },
            {
                path: "edit/:id",
                name: "Edit Standard",
                element: <EditAcademicStandard />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "academic_classes",
        name: "Classes",
        element: <AcademicClasses />,
        isMenu: true,
        menuGroup: "ACADEMICS",
        isPrivate: true, authType: true,
        icon: icons.academic_classes,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "Create Class",
                element: <CreateAcademicClass />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_academic_class,
            },
            {
                path: "edit/:id",
                name: "Edit Class",
                element: <EditAcademicClass />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "sections",
        name: "Sections",
        element: <Sections />,
        isMenu: true,
        menuGroup: "ACADEMICS",
        isPrivate: true, authType: true,
        icon: icons.sections,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "Create Section",
                element: <CreateSection />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_section,
            },
            {
                path: "edit/:id",
                name: "Edit Section",
                element: <EditSection />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "subject_groups",
        name: "Subject Groups",
        element: <SubjectGroups />,
        isMenu: true,
        menuGroup: "ACADEMICS",
        isPrivate: true, authType: true,
        icon: icons.subject_groups,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "Create Subject Group",
                element: <CreateSubjectGroup />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_subject_group,
            },
            {
                path: "edit/:id",
                name: "Edit Subject Group",
                element: <EditSubjectGroup />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "subjects",
        name: "Subjects",
        element: <Subjects />,
        isMenu: true,
        menuGroup: "ACADEMICS",
        isPrivate: true, authType: true,
        icon: icons.subjects,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "Create Subject",
                element: <CreateSubject />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_subject,
            },
            {
                path: "edit/:id",
                name: "Edit Subject",
                element: <EditSubject />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "campuses",
        name: "Campuses",
        element: <Campuses />,
        isMenu: true,
        menuGroup: "SETTINGS",
        isPrivate: true, authType: true,
        icon: icons.campuses,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "Create Campus",
                element: <CreateCampus />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_campus,
            },
            {
                path: "edit/:id",
                name: "Edit Campus",
                element: <EditCampus />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "buildings",
        name: "Buildings",
        element: <Buildings />,
        isMenu: true,
        menuGroup: "STRUCTURE",
        isPrivate: true, authType: true,
        icon: icons.buildings,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "Create Building",
                element: <CreateBuilding />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_building,
            },
            {
                path: "edit/:id",
                name: "Edit Building",
                element: <EditBuilding />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "floors",
        name: "Floors",
        element: <Floors />,
        isMenu: true,
        menuGroup: "STRUCTURE",
        isPrivate: true, authType: true,
        icon: icons.floors,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "Create Floor",
                element: <CreateFloor />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_floor,
            },
            {
                path: "edit/:id",
                name: "Edit Floor",
                element: <EditFloor />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "rooms",
        name: "Rooms",
        element: <Rooms />,
        isMenu: true,
        menuGroup: "STRUCTURE",
        isPrivate: true, authType: true,
        icon: icons.rooms,
        role: ["admin"],
        children: [
            {
                path: "create",
                name: "Create Room",
                element: <CreateRoom />,
                isMenu: false,
                isPrivate: true, authType: true,
                icon: icons.create_room,
            },
            {
                path: "edit/:id",
                name: "Edit Room",
                element: <EditRoom />,
                isMenu: false,
                isPrivate: true, authType: true,
            },
        ],
    },
    {
        path: "documents",
        name: "Documents",
        element: <Documents />,
        isMenu: true,
        menuGroup: "SETTINGS",
        isPrivate: true, authType: true,
    },
    {
        path: "examinations",
        name: "Examinations",
        element: <Examinations />,
        isMenu: true,
        menuGroup: "Examination",
        isPrivate: true, authType: true,
    },
    {
        path: "daily_collection_report",
        name: "Daily Collection",
        element: <DailyCollectionReport />,
        isMenu: true,
        menuGroup: "REPORT INTERFACE",
        isPrivate: true, authType: true,
    },
    {
        path: "monthly_collection_report",
        name: "Monthly Collection",
        element: <MonthlyCollectionReport />,
        isMenu: true,
        menuGroup: "REPORT INTERFACE",
        isPrivate: true, authType: true,
    },
    {
        path: "logout",
        name: "Logout",
        element: <Logout />,
        isMenu: true,
        menuGroup: "LOGOUT",
        isPrivate: true, authType: true,
        icon: icons.logout,
    },

    {
        path: "*",
        name: "NotFound",
        element: <NotFound />,
        isMenu: false,
        isPrivate: true, authType: true,
    },
];
