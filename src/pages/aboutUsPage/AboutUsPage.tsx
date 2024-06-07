import Header from '../../components/Header/Header';

import './AboutUsPage.css';

const AboutUsPage = () => {
  const teamMembers = [
    {
      name: 'Tatiana Dolgova',
      role: 'TeamLead, Frontend Developer',
      bio: '',
      github: 'https://github.com/TatyanaDolgova',
      photo:
        'https://raw.githubusercontent.com/belosnezhie/eCommerce-Application-data/main/images/Photo/tatiana-d.jpeg',
      contributions: [
        'Design and development of the main page',
        'Added the README file to the project',
        'Repository Setup',
        'Design and development of the catalog page',
        'Design and development of the header',
      ],
    },
    {
      name: 'Maria Treier',
      role: 'Frontend Developer',
      bio: '',
      github: 'https://github.com/TatyanaDolgova',
      photo:
        'https://raw.githubusercontent.com/belosnezhie/eCommerce-Application-data/main/images/Photo/maria.JPG',
      contributions: [
        'Design and development of the main page',
        'Added the README file to the project',
        'Repository Setup',
        'Design and development of the catalog page',
        'Design and development of the header',
      ],
    },
    {
      name: 'Tatiana Jafarova',
      role: 'Frontend Developer',
      bio: '',
      github: 'https://github.com/TatyanaDolgova',
      photo:
        'https://raw.githubusercontent.com/belosnezhie/eCommerce-Application-data/main/images/Photo/tatiana-j.JPEG',
      contributions: [
        'Design and development of the main page',
        'Added the README file to the project',
        'Repository Setup',
        'Design and development of the catalog page',
        'Design and development of the header',
      ],
    },
  ];

  return (
    <>
      <Header />
      <div className="about-us">
        <div className="team-collaboration">
          <h1 className="about-us-title">Effective Collaboration</h1>
          <p className="about-us-description">
            Our team collaborated effectively through regular meetings and code
            reviews. We used agile methodologies to ensure continuous progress
            and improvement. Each team member's unique skills and expertise
            contributed to overcoming challenges and achieving our project
            goals. Together, we created a website for selling plants that we are
            proud of, combining innovative ideas and robust technical
            implementation.
          </p>
        </div>
        <h2 className="about-us-subtitle">Meet Our Development Team</h2>
        <div className="team-members">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <img className="member-photo" src={member.photo} alt="" />
              <h2 className="team-member-title">{member.name}</h2>
              <h3 className="team-member-role">{member.role}</h3>
              <p className="team-member-bio">{member.bio}</p>
              <h4 className="team-member-contribut">Contributions:</h4>
              <ol className="contributions-list">
                {member.contributions.map((contribution, i) => (
                  <li key={i}>{contribution}</li>
                ))}
              </ol>
              <a
                className="team-member-github"
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                View GitHub Profile
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
