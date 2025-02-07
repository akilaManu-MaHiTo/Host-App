import {
  LeaveStatus,
  MaternityRegister,
} from "../OccupationalHealth/maternityRegisterApi";

export const sampleMaternityBenefitTypes = [
  "Maternity Leave",
  "Financial Aid",
  "Medical Support",
  "Other",
];

export const sampleMaternityRegisterData: MaternityRegister[] = [
  {
    id: "1",
    employee_id: "04707",
    name: "Mst. Sumaya Khatun",
    age: "27",
    contact_number: "1747818405",
    designation: "Helper",
    department: "Sewing",
    supervisor_manager: "Md Mahafuj Islam",
    date_of_join: new Date("2018-01-11"),
    average_wages: "87486",
    application_id: "3",
    application_date: new Date("2024-07-01"),
    expected_delivery_date: new Date("2024-09-01"),
    leave_start_date: new Date("2024-07-08"),
    leave_end_date: new Date("2024-10-27"),
    actual_delivery_date: new Date("2024-08-20"),
    leave_status: LeaveStatus.PENDING,
    notice_date_after_delivery: new Date("2024-10-28"),
    rejoining_date: new Date("2024-10-28"),
    support_provided: "",
    createdAt: "2024-11-20T10:54:35.470Z",
    updatedAt: "2024-11-20T10:54:35.470Z",
    publishedAt: "2024-11-20T10:54:35.466Z",
    signature: "Sumaya",
    remarks: "",
    created_date: new Date("2024-11-20"),
    status: "Completed",
    benefits_and_entitlements: [],
    medical_documents: [],
    division: "Sewing",
  },
  {
    id: "2",
    employee_id: "04708",
    name: "John Doe",
    age: "30",
    contact_number: "1234567890",
    designation: "Technician",
    department: "Maintenance",
    supervisor_manager: "Jane Smith",
    date_of_join: new Date("2017-05-15"),
    average_wages: "95000",
    application_id: "4",
    application_date: new Date("2024-06-15"),
    expected_delivery_date: new Date("2024-08-15"),
    leave_start_date: new Date("2024-06-20"),
    leave_end_date: new Date("2024-09-20"),
    actual_delivery_date: new Date("2024-08-10"),
    leave_status: LeaveStatus.APPROVED,
    notice_date_after_delivery: new Date("2024-09-21"),
    rejoining_date: new Date("2024-09-21"),
    support_provided: "Financial Aid",
    createdAt: "2024-11-21T11:00:00.000Z",
    updatedAt: "2024-11-21T11:00:00.000Z",
    publishedAt: "2024-11-21T11:00:00.000Z",
    signature: "John",
    remarks: "N/A",
    created_date: new Date("2024-11-21"),
    status: "In Progress",
    benefits_and_entitlements: [],
    medical_documents: [],
    division: "Maintenance",
  },
];
