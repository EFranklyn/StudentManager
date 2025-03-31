import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectIntroduction: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };


  const handleNavigate = () => {
    navigate('/student/list');
  };

  return (
    <div className={`container my-5`}>
      <header className="text-center mb-5">
        <h1 className="display-4">Student Management</h1>
        <p className="lead">Uma aplicação web para gerenciar estudantes do ensino superior.</p>
      </header>

      <nav>
        <ul className="nav nav-pills justify-content-center mb-5">
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => handleTabClick('overview')}
              role="button"
            >
              <i className="bi bi-laptop"></i> Visão Geral
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'technologies' ? 'active' : ''}`}
              onClick={() => handleTabClick('technologies')}
              role="button"
            >
              <i className="bi bi-database"></i> Tecnologias
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'architecture' ? 'active' : ''}`}
              onClick={() => handleTabClick('architecture')}
              role="button"
            >
              Arquitetura
            </a>
          </li>
        </ul>
      </nav>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="tab-pane fade show active">
            <section className="mb-5">
              <h2>Visão Geral</h2>
              <p>
                Este é um sistema completo para gerenciar o cadastro de estudantes do ensino superior. O formulário coleta informações detalhadas dos alunos, incluindo nome, e-mail, data de nascimento, instituição de ensino, curso, cidade e estado, foto, e redes sociais.
              </p>
              <p>
                A aplicação foi construída com <strong>React.js</strong> e usa ferramentas modernas como <strong>Bootstrap</strong> para o design, e <strong>Axios</strong> para a comunicação com APIs externas.
              </p>
            </section>
          </div>
        )}

        {activeTab === 'technologies' && (
          <div className="tab-pane fade show active">
            <section className="mb-5">
              <h2>Tecnologias Utilizadas</h2>
              <ul>
                <li><strong>React.js:</strong> Framework JavaScript para criar interfaces de usuário dinâmicas e reativas.</li>
                <li><strong>Bootstrap:</strong> Framework CSS para criar layouts responsivos e modernos.</li>
                <li><strong>Axios:</strong> Biblioteca para fazer requisições HTTP para APIs externas.</li>
                <li><strong>Semantic Release:</strong> Automatiza o versionamento e lançamento de novos recursos de forma estruturada e baseada em commits.</li>
                <li><strong>Class-Validator:</strong> Utilizado para validar as entradas do formulário de forma eficiente e declarativa.</li>
              </ul>
            </section>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="tab-pane fade show active">
            <section className="mb-5">
              <h2>Arquitetura</h2>
              <p>
                A aplicação foi estruturada de forma modular, utilizando layouts diferenciados para a organização do conteúdo.
              </p>
              <ul>
                <li><strong>Layout Principal:</strong> Onde ficam as informações gerais do sistema e são exibidos os dados de forma centralizada.</li>
                <li><strong>Layout de Estudante:</strong> Um layout dedicado a exibir informações e ações relacionadas a estudantes, como cadastro, edição e listagem.</li>
              </ul>
              <p>
                Essa estrutura facilita a manutenção e a escalabilidade da aplicação, permitindo a adição de novas funcionalidades de forma organizada.
              </p>
            </section>
          </div>
        )}
      </div>

      <div className="text-center">
        <button onClick={handleNavigate} className="btn btn-primary btn-lg">
          <i className="bi bi-person-lines-fill"></i> Ver Estudantes
        </button>
      </div>
    </div>
  );
};

export default ProjectIntroduction;