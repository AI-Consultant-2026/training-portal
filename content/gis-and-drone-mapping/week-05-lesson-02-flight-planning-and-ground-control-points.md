---
course: GIS and Drone Mapping
module: "Module 4: Drone Operations & Survey Mapping"
week: 5
lesson: 2
lesson_title: "Flight Planning and Ground Control Points"
db_lesson_content: "Designing an effective mapping mission, including altitude, overlap, and using ground control points for real-world positional accuracy."
target_length_minutes: 8
---

# Lesson 2: Flight Planning and Ground Control Points

Last lesson covered the two main types of mapping drones and the legal, safety framework governing drone operations in Nigeria. Now let's put a compliant, well-equipped drone to work.

## Flight Planning and Mission Design

Effective drone mapping requires careful, deliberate planning well before the drone ever actually leaves the ground — precisely what this week's practical exercise focuses on.

**Mission design** starts with clearly defining the specific area to be mapped and the required level of resolution and accuracy for the intended purpose. This directly determines flight altitude — lower altitude produces higher resolution imagery, but requires meaningfully more individual flight passes to fully cover the same total area — and it determines image overlap, since mapping software needs sufficient overlap between consecutive photos, typically somewhere around 70 to 80 percent, to properly and reliably stitch them together later into one seamless composite image.

Modern drone mapping software can automatically generate an efficient, systematic flight path — commonly a back-and-forth pattern often called a "lawnmower pattern" — based on your specified area, desired altitude, and required overlap settings. But understanding these underlying parameters yourself remains genuinely essential, since blindly trusting fully automated defaults without real understanding can produce data that's ultimately inadequate for your specific intended purpose.

Other genuinely important planning considerations include battery life and how many discrete flights will realistically be needed to fully cover the planned area, the optimal time of day for capturing consistent lighting, since low sun angles can create long, unwanted shadows that meaningfully complicate later analysis, and identifying appropriate, safe takeoff and landing locations in advance.

## Ground Control Points and Accuracy

While drone imagery itself is genuinely detailed, ensuring that detail is also accurately positioned in real-world space requires **ground control points, GCPs**.

A ground control point is a specific, clearly visible location whose exact real-world coordinates are known with high precision, typically measured using accurate survey-grade GPS equipment. These known points are placed at clearly visible locations throughout the area before the actual drone flight, and photographed as part of that flight along with everything else. During later processing, software uses these known reference points to precisely correct and calibrate the overall positional accuracy of the final drone-derived map, correcting for any drift or minor error in the drone's own onboard, less precise GPS system.

Without properly placed ground control points, a drone map might look genuinely detailed and convincing, while still being meaningfully, sometimes significantly, offset from its true real-world position — a serious problem if that resulting map is later used, for example, to establish precise legal property boundaries or plan infrastructure that must connect accurately with existing systems.

## Bringing It Together

Today we covered how to properly plan an effective drone mapping mission, and how ground control points ensure genuine real-world positional accuracy in the finished map.

For your assignment, research Nigeria's specific drone regulations in real detail and document the compliance requirements relevant to a professional mapping operation. For your practical exercise, plan a complete drone survey mission and document all your chosen flight parameters, applying everything covered this week.

Next week, we cover drone image processing, photogrammetry, and how individual photos become finished orthomosaics and 3D models.
