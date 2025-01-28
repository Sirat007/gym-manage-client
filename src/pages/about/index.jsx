import {
  TeamOutlined,
  TrophyOutlined,
  HeartOutlined,
  ToolOutlined,
} from "@ant-design/icons";

const AboutPage = () => {
  return (
    <div className="py-16 bg-gray-50 pt-28">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Title */}
        <div className=" mb-12">
          <h4 className="text-3xl font-bold">About Us</h4>
          <hr className="w-28 mt-2 bg-blue-700 h-1" />
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Mission Text */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4 text-justify">
                At PulsePoint, our mission is to empower individuals to achieve
                their fitness goals through state-of-the-art facilities, expert
                guidance, and a supportive community. We believe in making
                fitness accessible, enjoyable, and effective for everyone.
              </p>
              <p className="text-lg text-gray-600 mb-4 text-justify">
                We are committed to creating an inclusive environment where
                everyone, regardless of their fitness level, can thrive. Our
                team of certified trainers and wellness experts are here to
                guide you every step of the way, helping you build strength,
                confidence, and a healthier lifestyle.
              </p>
              <p className="text-lg text-gray-600 text-justify">
                At PulsePoint, we go beyond just physical fitness. We aim to
                inspire a holistic approach to wellness, combining physical
                activity, mental well-being, and nutritional balance to help you
                achieve your best self. Join us and become part of a community
                that celebrates progress, no matter how big or small.
              </p>
            </div>
            {/* Mission Image */}
            <div>
              <img
                src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80"
                alt="Mission"
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Goals Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <TrophyOutlined className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Promote Health</h3>
              <p className="text-gray-600">
                Help members lead healthier, more active lifestyles.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <HeartOutlined className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Build Community</h3>
              <p className="text-gray-600">
                Foster a supportive and inclusive fitness community.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <ToolOutlined className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Innovate Fitness</h3>
              <p className="text-gray-600">
                Provide cutting-edge equipment and training programs.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <TeamOutlined className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Empower Members</h3>
              <p className="text-gray-600">
                Equip members with the tools to achieve their goals.
              </p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Personal Training</h3>
              <p className="text-gray-600">
                One-on-one sessions with certified trainers to help you reach
                your fitness goals.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Group Classes</h3>
              <p className="text-gray-600">
                Join our high-energy group classes, including yoga, Zumba, and
                cardio.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Nutrition Plans</h3>
              <p className="text-gray-600">
                Customized nutrition plans to complement your fitness journey.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <img
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">John Doe</h3>
              <p className="text-gray-600">Head Trainer</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">Jane Smith</h3>
              <p className="text-gray-600">Yoga Instructor</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">Mike Johnson</h3>
              <p className="text-gray-600">Nutritionist</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <img
                src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">Sarah Lee</h3>
              <p className="text-gray-600">Cardio Specialist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
