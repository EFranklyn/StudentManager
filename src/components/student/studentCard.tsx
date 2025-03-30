import React from "react";
import { StudentModel } from "../../models/student.model";
import { SocialMediaModel } from "../../models/socialMedial.model";

interface StudentCardProps {
  student: StudentModel;
  onEdit: () => void; // Função de edição
  onDelete: () => void; // Função de exclusão
}

const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onEdit,
  onDelete,
}) => {
  const vrColors = [
    "danger",
    "success",
    "info",
    "primary",
    "cyan",
    "teal",
    "green",
    "yellow",
    "orange",
    "red",
    "pink",
    "purple",
    "indigo",
    "blue",
  ];
  const randomColor = vrColors[Math.floor(Math.random() * vrColors.length - 1)];

  const getAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getSocialMedias = (type: string) => {
    return student.socialMedias.find(
      (social: SocialMediaModel) => social.type === type
    );
  };

  const formatUrl = (url: string) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <div className="col-12 col-lg-4 mb-4 checklist-item checklist-item-primary pb-4">
      <div className="card border shadow">
        <div className="p-2 pr-3 mb--5 bg-transparent d-flex justify-content-between align-items-center">
          <div className="dislpay-4 fw-bold ml--5">{student.fullName}</div>
          <div>
            <button className="btn btn-sm btn-warning m-1"
            onClick={() => onEdit()}>
              <i className="bi bi-pencil-fill"></i>
            </button>
            <button className="btn btn-sm btn-danger m-1"
            onClick={()=>onDelete()}>
              <i className="bi bi-trash-fill"></i>
            </button>
          </div>
        </div>
        <div className="card-body p-2">
          <div className="d-flex">
            <div className="flex-shrink-0">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img
                  src={student.photo!}
                  alt="Generic placeholder image"
                  className="img-fluid rounded-circle p-2"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>

            <div
              className={`d-flex m-1 `}
              style={{
                height: "100px",
                width: "2px",
                borderRadius: "10px",
                boxShadow: `2px 1px 6px 1px var(--bs-${randomColor})`,
                backgroundColor: `var(--bs-${randomColor})`,
              }}
            >
              <div className="vr "></div>
            </div>
            <div className="flex-grow-1 ms-3">
              <p className="mb-2 pb-1 lead">{student.course!.label!}</p>
              <div className="blockquote-footer pb-0 mb-0">{student.school}</div>
              <blockquote className="mt--3">
                <small className="fw-normal">
                  {getAge(student.birthDate!)} anos,
                </small>
                <small className="ms-2 fs-7 ">
                  {formatDate(student.birthDate!)}
                </small>
              </blockquote>
            </div>
          </div>
          <div className="d-flex justify-content-center rounded-3 p-0 m-0 bg-body-tertiary">
            <div className="fw-normal blackout">
              <blockquote className="blockquote d-flex  mb-0 align-items-center">
                <i className="bi bi-envelope-fill mt-1 mb-0 me-3 fs-16 text-primary"></i>
                <small className="lead">{student.email}</small>
              </blockquote>
              <div className="d-flex mb-0 align-items-center">
                <i className="bi bi-geo-alt-fill mt--1 me-3 fs-16 text-primary"></i>
                <small className="">
                  {student.city!.label} - {student.state!.label}
                </small>
              </div>
              <ul className="list-group list-group-flush pt-2 pb-2">
                <li className="list-group-item p-0 rounded-3">
                  <i
                    className="bi bi-facebook mt--1 me-3 fs-16 p-2"
                    style={{ color: "#1877F2" }}
                  ></i>
                  {getSocialMedias("Facebook")?.url ? (
                    <a
                      href={formatUrl(getSocialMedias("Facebook")?.url || "")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                    >
                      {getSocialMedias("Facebook")?.url}
                    </a>
                  ) : (
                    "Não informado"
                  )}
                </li>
                <li className="list-group-item p-0 rounded-3">
                  <i
                    className="bi bi-linkedin mt--1 me-3 fs-16 p-2"
                    style={{ color: "#0A66C2" }}
                  ></i>
                  {getSocialMedias("LinkedIn")?.url ? (
                    <a
                      href={formatUrl(getSocialMedias("LinkedIn")?.url ?? "")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                    >
                      {getSocialMedias("LinkedIn")?.url}
                    </a>
                  ) : (
                    <small className="blackout-footer text-secondary">
                      Não informado
                    </small>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
