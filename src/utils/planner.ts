import { CalendarEvent, StrictTableItem, WriterInfo } from "./types";
import dayjs from "dayjs";

// TODO: all the gh error stuff

export function addDays(start: Date, toAdd: number) {
  return dayjs(start).add(toAdd, "days").toDate();
}

export function daysBetween(start: Date, end: Date) {
  return Math.abs(dayjs(start).diff(dayjs(end), "day"));
}

export function isDateOnOrAfterDate(dateToCheck: Date, referenceDate: Date) {
  const dateIsAfter = dayjs(dateToCheck).isAfter(dayjs(referenceDate), "day");
  const dateIsOn = dayjs(dateToCheck).isSame(dayjs(referenceDate), "day");

  return dateIsAfter || dateIsOn;
}

export function createWritingPlan({
  writerInfo: { writingLength, reviewSessionCount, startDate },
  tableData,
}: {
  writerInfo: WriterInfo;
  tableData: StrictTableItem[];
}) {
  const outputEvents: CalendarEvent[] = [];
  const deadlines: CalendarEvent[] = [];
  const maxReviewLength = 5;

  // Deadline
  tableData.forEach(({ institution, essayCount, deadline }) => {
    deadlines.push({
      institution: "Deadline",
      title: `✉️ ${institution} Deadline`,
      start: deadline,
      end: deadline,
    });

    // Event Creator
    const daysUntilDeadline = daysBetween(startDate, deadline);
    const essayTag = Number(essayCount) == 1 ? "#1" : `#1-${essayCount}`;
    if (writingLength >= daysUntilDeadline) {
      // Write and Review
      outputEvents.push({
        institution: institution,
        title: `💨 Write and Review ${institution} ${essayTag}`,
        start: startDate,
        end: deadline,
      });
    } else {
      const essayCountNumber = Number(essayCount);
      const maxEssaysPerDay = essayCountNumber < 5 ? 2 : 3;
      let essayStartDate = startDate;

      let currentEssay = 1;
      while (currentEssay <= essayCountNumber) {
        let endEssay = Math.min(
          currentEssay + maxEssaysPerDay - 1,
          essayCountNumber
        );

        // Write
        let finishedWritingDate = addDays(essayStartDate, writingLength);
        if (isDateOnOrAfterDate(finishedWritingDate, deadline)) {
          finishedWritingDate = deadline;
        }

        let writeTitle = `✍️ Write ${institution} #`;
        if (currentEssay === endEssay) {
          writeTitle += `${currentEssay}`;
        } else {
          writeTitle += `${currentEssay}-${endEssay}`;
        }

        outputEvents.push({
          institution: institution,
          title: writeTitle,
          start: essayStartDate,
          end: finishedWritingDate,
        });

        // Review
        const reviewPeriodLength = Math.abs(
          dayjs(finishedWritingDate).diff(dayjs(deadline), "day")
        );
        const reviewSessionLength = Math.min(
          maxReviewLength,
          Math.floor(reviewPeriodLength / reviewSessionCount)
        );

        const totalReviewTime = reviewSessionCount * reviewSessionLength;
        const totalBreakTime =
          daysBetween(finishedWritingDate, deadline) - totalReviewTime;
        const breakLength =
          reviewSessionCount > 1
            ? Math.max(1, Math.floor(totalBreakTime / (reviewSessionCount - 1)))
            : 0;

        let lastProcessedDate = finishedWritingDate;
        for (let i = 0; i < reviewSessionCount; i++) {
          if (isDateOnOrAfterDate(lastProcessedDate, deadline)) {
            break;
          }
          let reviewEndDate = addDays(lastProcessedDate, reviewSessionLength);
          if (isDateOnOrAfterDate(reviewEndDate, deadline)) {
            reviewEndDate = deadline;
          }

          for (let j = currentEssay; j <= endEssay; j++) {
            outputEvents.push({
              institution: institution,
              title: `📝 Review ${institution} #${j}`,
              start: lastProcessedDate,
              end: reviewEndDate,
            });
          }

          lastProcessedDate = addDays(
            lastProcessedDate,
            reviewSessionLength + breakLength
          );
        }

        currentEssay = endEssay + 1;
        essayStartDate = addDays(essayStartDate, 1);
      }
    }
  });
  return [...deadlines, ...outputEvents];
}
