import { SiNotion } from 'react-icons/si';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-brand_2 flex flex-col items-center p-5">
      <div className="flex space-x-4 mb-2">
        <a href="https://github.com/WithUS-ZB" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} />
        </a>
        <a
          href="https://www.notion.so/With-Us-8db7e62661cb49fe9e04fd9acd39c8e1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiNotion size={24} />
        </a>
      </div>
      <div className="text-center">
        <div className="flex space-x-6 text-xl">
          <div>
            <p>FE - 우승찬</p>
            <p>FE - 이수광</p>
          </div>
          <div>
            <p>BE - 임국희</p>
            <p>BE - 박지은</p>
            <p>BE - 박강락</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
