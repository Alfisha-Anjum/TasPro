"use client";

import ScheduleCard from "./ScheduleCard";

interface Schedule {
  id: string;
  serviceTitle: string;
  serviceSubtitle: string;
  serviceImage: string;
  rating: number;
  reviews: number;
  status: "Pending" | "Completed" | "Running";
  date: string;
  time: string;
}

interface ScheduleListProps {
  schedules: Schedule[];
  selectedScheduleId?: string | null;
  onScheduleSelect?: (id: string) => void;
}

const ScheduleList = ({ schedules, selectedScheduleId, onScheduleSelect }: ScheduleListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {schedules.map((schedule) => (
        <ScheduleCard
          key={schedule.id}
          id={schedule.id}
          serviceTitle={schedule.serviceTitle}
          serviceSubtitle={schedule.serviceSubtitle}
          serviceImage={schedule.serviceImage}
          rating={schedule.rating}
          reviews={schedule.reviews}
          status={schedule.status}
          date={schedule.date}
          time={schedule.time}
          onClick={onScheduleSelect}
          isSelected={selectedScheduleId === schedule.id}
        />
      ))}
    </div>
  );
};

export default ScheduleList;
