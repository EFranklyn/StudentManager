import React from 'react';
import './styles.css';
import rocket from "../../../assets/images/rocket.png"

interface RocketLoadingProps {
    loading?: boolean;
    message?: string
  }

const RocketLoader: React.FC<RocketLoadingProps> = ({ loading, message='Carregando'}) => {
// const RocketLoader = () => {
    return loading ? (
        <div className="box-rocket">
          <div className="rocket-launcher">
            <img
              src={rocket}
              className="rocket"
              alt="Foguete"
              style={{
                height: '200px',
                width: '160px',
              }}
            />
            <h1 className="loading-message tw-bold ">{message}</h1>
          </div>
        </div>
      ) : null;
};

export default RocketLoader;