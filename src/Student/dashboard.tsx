/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Users, BookOpen, ChevronRight } from "lucide-react";
import { Card, CardContent } from "../components/card";
import axios from "../config/axiosconfig";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

interface Member {
  name: string;
  role?: string;
}

interface Group {
  name: string;
  topic: string;
  members: Member[];
}

const StudentGroupDashboard = () => {
  const [group, setGroup] = useState<Group>({
    name: "",
    topic: "",
    members: [],
  });

  const studentId = localStorage.getItem("studentId");

  const getGroup = async () => {
    try {
      const res = await axios.get(`/groups/${studentId}`);
      // Map backend response to frontend structure
      const groupData: Group = {
        name: res.data.group.name,
        topic: res.data.group.topic,
        members: res.data.group.students.map((s: any) => ({
          name: s.fullName,
          role: s.category, // if you have roles in the future, you can add here
        })),
      };
      setGroup(groupData);
    } catch (error) {
      if (isAxiosError(error)) {
        const msg =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "An unexpected error occurred";
        toast.error(msg);
      }
    }
  };

  useEffect(() => {
    getGroup();
  }, [studentId]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">My Group</h1>

      <Card className="p-4 mb-8 shadow-md rounded-2xl">
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">{group.name}</h2>
              <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                <BookOpen size={16} /> {group.topic}
              </p>
            </div>
            <ChevronRight />
          </div>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
        <Users size={20} /> Group Members
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {group.members.map((member, index) => (
          <Card key={index} className="shadow rounded-2xl p-4">
            <CardContent>
              <p className="text-lg font-medium">{member.name}</p>
              {member.role && (
                <p className="text-gray-500 text-sm">{member.role}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentGroupDashboard;
