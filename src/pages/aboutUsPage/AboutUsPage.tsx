import Header from '../../components/Header/Header';

import './AboutUsPage.css';

const AboutUsPage = () => {
  const teamMembers = [
    {
      name: 'Tatiana Dolgova',
      role: 'TeamLead, Frontend Developer',
      bio: 'As a Team Lead and Frontend Developer, I am passionate about creating user-friendly and visually appealing web interfaces. I am committed to delivering high-quality and impactful projects.',
      github: 'https://github.com/TatyanaDolgova',
      photo:
        'https://raw.githubusercontent.com/belosnezhie/eCommerce-Application-data/main/images/Photo/tatiana-d.jpeg',
      contributions: [
        'Designed and developed the main page layout.',
        'Authored the comprehensive README file.',
        'Set up and organized the project repository.',
        'Created the catalog page for browsing products.',
        'Developed the engaging "About Us" page.',
      ],
    },
    {
      name: 'Maria Treier',
      role: 'Frontend Developer',
      bio: 'I am a Frontend Developer with a keen eye for detail and a strong focus on creating seamless user experiences. I have honed my skills in building responsive and efficient web applications.',
      github: 'https://github.com/belosnezhie',
      photo:
        'https://raw.githubusercontent.com/belosnezhie/eCommerce-Application-data/main/images/Photo/maria.JPG',
      contributions: [
        'Configured the development environment.',
        'Developed and optimized automation scripts.',
        'Created the secure and user-friendly login page.',
        'Created products in CommerceTools.',
        'Designed the detailed product information page.',
      ],
    },
    {
      name: 'Tatiana Jafarova',
      role: 'Frontend Developer',
      bio: 'With a deep passion for frontend development, I have been enthusiastically creating web solutions. My goal is to develop intuitive and engaging user interfaces that enhance the overall user experience.',
      github: 'https://github.com/Jofetta',
      photo:
        'https://raw.githubusercontent.com/belosnezhie/eCommerce-Application-data/main/images/Photo/tatiana-j.JPEG',
      contributions: [
        'Set up the CommerceTools project and API client.',
        'Developed the user-friendly registration page.',
        'Created the interactive user profile page.',
        'Designed and developed the dynamic basket page.',
        'Implemented pop-up notifications for user feedback and alerts.',
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
        <div className="rs-school-info">
          <p className="thank-you-message">
            Thank you RS School for teaching us everything.
          </p>
          <a
            href="https://rs.school/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="rs-school-logo" />
          </a>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
