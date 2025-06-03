import { Scenario } from '../types/campaign';

export const campaignScenarios: Scenario[] = [
  {
    title: "First Day on Site",
    day: 1,
    scenarioKey: "first-day",
    description: "It's your first day at the industrial facility. Learn about confined space hazards and basic safety protocols.",
    steps: [
      {
        id: "permit-review",
        description: "Before entering the confined space, what should you do first?",
        vital: true,
        options: [
          {
            id: "permit-correct",
            text: "Review the work permit and hazard assessment thoroughly",
            correct: true,
            feedback: "Correct! Always review the permit and hazard assessment before any confined space entry. This is a critical safety step."
          },
          {
            id: "permit-wrong1",
            text: "Enter the space to assess hazards firsthand",
            correct: false,
            feedback: "Incorrect and dangerous! Never enter a confined space without first reviewing the permit and hazard assessment."
          },
          {
            id: "permit-wrong2",
            text: "Ask a colleague if they think it's safe",
            correct: false,
            feedback: "Incorrect. While consultation is good, you must always formally review the permit and hazard assessment."
          }
        ]
      },
      {
        id: "ppe-selection",
        description: "Which PPE should you select for this confined space entry?",
        vital: true,
        options: [
          {
            id: "ppe-correct",
            text: "Hard hat, safety glasses, gloves, steel-toed boots, and respiratory protection as specified in the permit",
            correct: true,
            feedback: "Correct! You've selected the appropriate PPE as required by the permit for this confined space."
          },
          {
            id: "ppe-wrong1",
            text: "Whatever PPE is available in the storage room",
            correct: false,
            feedback: "Incorrect. PPE must be specifically selected based on the hazards identified in the permit."
          },
          {
            id: "ppe-wrong2",
            text: "Just a hard hat and gloves should be sufficient",
            correct: false,
            feedback: "Incorrect. Confined spaces require comprehensive PPE as specified in the permit."
          }
        ]
      },
      {
        id: "ppe-inspection",
        description: "Before using your PPE, what should you do?",
        vital: true,
        options: [
          {
            id: "inspection-correct",
            text: "Thoroughly inspect all PPE for damage or defects",
            correct: true,
            feedback: "Correct! Always inspect PPE before use to ensure it will provide proper protection."
          },
          {
            id: "inspection-wrong1",
            text: "Put it on immediately to save time",
            correct: false,
            feedback: "Incorrect. Using damaged PPE can be as dangerous as wearing no PPE at all."
          },
          {
            id: "inspection-wrong2",
            text: "Have someone else check it while you prepare other equipment",
            correct: false,
            feedback: "Incorrect. While having a second check is good, you are responsible for inspecting your own PPE."
          }
        ]
      }
    ]
  },
  {
    title: "Permit System Introduction",
    day: 2,
    scenarioKey: "permit-system",
    description: "Understand the confined space entry permit system and why it's critical for your safety.",
    steps: [
      {
        id: "permit-components",
        description: "Which of the following is NOT typically included in a confined space entry permit?",
        vital: true,
        options: [
          {
            id: "components-correct",
            text: "The entrant's home address and emergency contact",
            correct: true,
            feedback: "Correct! While personal emergency contacts may be on file elsewhere, they are not typically part of the entry permit itself."
          },
          {
            id: "components-wrong1",
            text: "Hazard controls and emergency procedures",
            correct: false,
            feedback: "Incorrect. Hazard controls and emergency procedures are essential components of a confined space entry permit."
          },
          {
            id: "components-wrong2",
            text: "Atmospheric testing results",
            correct: false,
            feedback: "Incorrect. Atmospheric testing results must be documented on the permit."
          }
        ]
      },
      {
        id: "permit-validity",
        description: "How long is a typical confined space entry permit valid?",
        vital: false,
        options: [
          {
            id: "validity-correct",
            text: "For the duration specified on the permit, typically one shift or one day",
            correct: true,
            feedback: "Correct! Permits are typically valid for a limited time period, often just one shift or one day."
          },
          {
            id: "validity-wrong1",
            text: "Indefinitely, as long as the work continues",
            correct: false,
            feedback: "Incorrect. Permits have a specific validity period and must be renewed if work continues beyond that time."
          },
          {
            id: "validity-wrong2",
            text: "For one week from issuance",
            correct: false,
            feedback: "Incorrect. Most permits are valid for much shorter periods, typically one shift or one day."
          }
        ]
      },
      {
        id: "permit-cancellation",
        description: "Under which circumstance should a confined space entry permit be canceled?",
        vital: true,
        options: [
          {
            id: "cancellation-correct",
            text: "When conditions change from those specified on the permit",
            correct: true,
            feedback: "Correct! Any change in conditions requires reassessment and potentially a new permit."
          },
          {
            id: "cancellation-wrong1",
            text: "Only when the work is completed",
            correct: false,
            feedback: "Incorrect. While permits are closed upon work completion, they must be canceled if conditions change."
          },
          {
            id: "cancellation-wrong2",
            text: "Only if a supervisor requests cancellation",
            correct: false,
            feedback: "Incorrect. Any worker can and should stop work if conditions change, not just supervisors."
          }
        ]
      }
    ]
  },
  {
    title: "Atmospheric Testing",
    day: 3,
    scenarioKey: "atmospheric-testing",
    description: "Learn how to test for hazardous atmospheres before entering confined spaces.",
    steps: [
      {
        id: "gas-detector-calibration",
        description: "Before using a gas detector, what must you do?",
        vital: true,
        options: [
          {
            id: "calibration-correct",
            text: "Ensure it's calibrated and perform a bump test",
            correct: true,
            feedback: "Correct! Calibration and bump testing are essential to ensure the detector will accurately identify hazards."
          },
          {
            id: "calibration-wrong1",
            text: "Check that the battery is charged",
            correct: false,
            feedback: "Incorrect. While battery check is important, calibration and bump testing are critical first steps."
          },
          {
            id: "calibration-wrong2",
            text: "Turn it on and immediately use it",
            correct: false,
            feedback: "Incorrect and dangerous! Using an uncalibrated detector could give false readings and put lives at risk."
          }
        ]
      },
      {
        id: "testing-location",
        description: "Where should you test the atmosphere in a confined space?",
        vital: true,
        options: [
          {
            id: "location-correct",
            text: "At multiple levels (top, middle, bottom) and in all areas where work will occur",
            correct: true,
            feedback: "Correct! Different gases may be present at different levels, so comprehensive testing is essential."
          },
          {
            id: "location-wrong1",
            text: "Just at the entry point",
            correct: false,
            feedback: "Incorrect. Testing only at the entry point is insufficient as hazardous gases may be present elsewhere."
          },
          {
            id: "location-wrong2",
            text: "Only in the area where you'll be working",
            correct: false,
            feedback: "Incorrect. You must test the entire space at multiple levels to ensure safety."
          }
        ]
      },
      {
        id: "oxygen-reading",
        description: "You get an oxygen reading of 19.0%. What should you do?",
        vital: true,
        options: [
          {
            id: "oxygen-correct",
            text: "Do not enter. Ventilate the space and retest until oxygen levels are between 19.5% and 23.5%",
            correct: true,
            feedback: "Correct! 19.0% oxygen is below the safe minimum of 19.5%. Never enter a space with insufficient oxygen."
          },
          {
            id: "oxygen-wrong1",
            text: "Enter with caution since the reading is close to 19.5%",
            correct: false,
            feedback: "Incorrect and dangerous! Never enter a space with oxygen levels below 19.5%."
          },
          {
            id: "oxygen-wrong2",
            text: "Enter with a supplied air respirator",
            correct: false,
            feedback: "Incorrect. While respiratory protection is important, the space must be properly ventilated and retested first."
          }
        ]
      },
      {
        id: "continuous-monitoring",
        description: "After initial testing shows safe conditions, what should you do with the gas detector?",
        vital: true,
        options: [
          {
            id: "monitoring-correct",
            text: "Keep it with you and continue monitoring throughout the entry",
            correct: true,
            feedback: "Correct! Conditions can change rapidly in confined spaces, so continuous monitoring is essential."
          },
          {
            id: "monitoring-wrong1",
            text: "Return it so others can use it",
            correct: false,
            feedback: "Incorrect. Continuous monitoring is required throughout the entire confined space entry."
          },
          {
            id: "monitoring-wrong2",
            text: "Place it at the entry point for the attendant to monitor",
            correct: false,
            feedback: "Incorrect. The detector must be with the entrant to monitor their immediate atmosphere."
          }
        ]
      }
    ]
  },
  {
    title: "Communication Protocols",
    day: 4,
    scenarioKey: "communication",
    description: "Master the communication protocols between entrants and attendants during confined space operations.",
    steps: [
      {
        id: "communication-methods",
        description: "Which communication method is most reliable for confined space entry?",
        vital: false,
        options: [
          {
            id: "methods-correct",
            text: "A combination of radio communication and pre-established hand signals",
            correct: true,
            feedback: "Correct! Multiple redundant communication methods provide the best safety."
          },
          {
            id: "methods-wrong1",
            text: "Shouting to the attendant",
            correct: false,
            feedback: "Incorrect. Shouting is unreliable and may not be heard in noisy environments or deeper spaces."
          },
          {
            id: "methods-wrong2",
            text: "Relying solely on radio communication",
            correct: false,
            feedback: "Incorrect. Radio signals can be blocked or fail in confined spaces, so backup methods are needed."
          }
        ]
      },
      {
        id: "check-in-frequency",
        description: "How often should entrants and attendants check in with each other?",
        vital: true,
        options: [
          {
            id: "frequency-correct",
            text: "At regular intervals agreed upon before entry, typically every 5-10 minutes",
            correct: true,
            feedback: "Correct! Regular communication ensures quick response if problems arise."
          },
          {
            id: "frequency-wrong1",
            text: "Only when there's a problem",
            correct: false,
            feedback: "Incorrect. Regular check-ins are needed to confirm ongoing safety, not just during emergencies."
          },
          {
            id: "frequency-wrong2",
            text: "At the beginning and end of the entry only",
            correct: false,
            feedback: "Incorrect. Periodic communication throughout the entry is essential for safety."
          }
        ]
      },
      {
        id: "emergency-signal",
        description: "What should you do if you hear the emergency evacuation signal?",
        vital: true,
        options: [
          {
            id: "evacuation-correct",
            text: "Stop work immediately and exit the space as quickly and safely as possible",
            correct: true,
            feedback: "Correct! Immediate evacuation is critical when an emergency signal is given."
          },
          {
            id: "evacuation-wrong1",
            text: "Finish your current task, then exit",
            correct: false,
            feedback: "Incorrect and dangerous! Emergency evacuation means immediate exit, no exceptions."
          },
          {
            id: "evacuation-wrong2",
            text: "Ask for clarification before exiting",
            correct: false,
            feedback: "Incorrect. In an emergency, exit first and ask questions later."
          }
        ]
      }
    ]
  },
  {
    title: "Emergency Response",
    day: 5,
    scenarioKey: "emergency",
    description: "Practice emergency response procedures for confined space incidents.",
    steps: [
      {
        id: "alarm-response",
        description: "Your gas detector alarms while you're in a confined space. What should you do first?",
        vital: true,
        options: [
          {
            id: "alarm-correct",
            text: "Stop work immediately and exit the space",
            correct: true,
            feedback: "Correct! When a gas detector alarms, immediate evacuation is the proper response."
          },
          {
            id: "alarm-wrong1",
            text: "Check the detector to see what gas is present",
            correct: false,
            feedback: "Incorrect. Exit first, then determine the cause from a safe location."
          },
          {
            id: "alarm-wrong2",
            text: "Put on your respirator and continue working",
            correct: false,
            feedback: "Incorrect and dangerous! Always evacuate when a gas detector alarms."
          }
        ]
      },
      {
        id: "entrant-distress",
        description: "As an attendant, you notice an entrant appears disoriented. What should you do?",
        vital: true,
        options: [
          {
            id: "distress-correct",
            text: "Order immediate evacuation and call for emergency response if the entrant cannot exit on their own",
            correct: true,
            feedback: "Correct! Disorientation could indicate exposure to hazardous atmosphere or other dangers."
          },
          {
            id: "distress-wrong1",
            text: "Enter the space to help them",
            correct: false,
            feedback: "Incorrect and potentially fatal! Never enter a space to attempt rescue without proper training and equipment."
          },
          {
            id: "distress-wrong2",
            text: "Wait to see if they improve",
            correct: false,
            feedback: "Incorrect. Disorientation is a serious symptom that requires immediate action."
          }
        ]
      },
      {
        id: "rescue-attempt",
        description: "A worker has collapsed in a confined space. As a trained rescuer, what is your first priority?",
        vital: true,
        options: [
          {
            id: "rescue-correct",
            text: "Ensure your own safety by verifying atmospheric conditions and using appropriate PPE before attempting rescue",
            correct: true,
            feedback: "Correct! Even trained rescuers must ensure their own safety first to avoid becoming additional victims."
          },
          {
            id: "rescue-wrong1",
            text: "Enter immediately to pull the worker out",
            correct: false,
            feedback: "Incorrect and potentially fatal! Rushing in without proper assessment has led to multiple fatalities."
          },
          {
            id: "rescue-wrong2",
            text: "Call for more help before doing anything",
            correct: false,
            feedback: "Partially correct but incomplete. While calling for help is important, trained rescuers should begin response following proper protocols."
          }
        ]
      }
    ]
  },
  {
    title: "Equipment Inspection",
    day: 6,
    scenarioKey: "equipment",
    description: "Learn how to properly inspect and use personal protective equipment for confined space entry.",
    steps: [
      {
        id: "harness-inspection",
        description: "When inspecting a full-body harness, which finding would make it unsuitable for use?",
        vital: true,
        options: [
          {
            id: "harness-correct",
            text: "Frayed or damaged webbing",
            correct: true,
            feedback: "Correct! Any damage to the webbing compromises the integrity of the harness and makes it unsafe."
          },
          {
            id: "harness-wrong1",
            text: "Manufacturer's tag is slightly faded",
            correct: false,
            feedback: "Incorrect. While the tag should be legible, slight fading doesn't affect functionality."
          },
          {
            id: "harness-wrong2",
            text: "The harness is a different color than your usual one",
            correct: false,
            feedback: "Incorrect. Color doesn't affect the safety functionality of the harness."
          }
        ]
      },
      {
        id: "respirator-check",
        description: "Before using a respirator, what must you verify?",
        vital: true,
        options: [
          {
            id: "respirator-correct",
            text: "That you've been fit-tested for that specific model and it creates a proper seal on your face",
            correct: true,
            feedback: "Correct! Proper fit testing and seal checking are essential for respirator effectiveness."
          },
          {
            id: "respirator-wrong1",
            text: "That it's the newest model available",
            correct: false,
            feedback: "Incorrect. The model's age is less important than proper fit and function."
          },
          {
            id: "respirator-wrong2",
            text: "That it looks clean",
            correct: false,
            feedback: "Incorrect. While cleanliness matters, proper fit testing and seal verification are more critical."
          }
        ]
      },
      {
        id: "tripod-setup",
        description: "When setting up a tripod retrieval system over a confined space entry, what is most important?",
        vital: true,
        options: [
          {
            id: "tripod-correct",
            text: "Ensuring it's on stable, level ground with legs fully extended and locked",
            correct: true,
            feedback: "Correct! A stable tripod is essential for effective emergency retrieval."
          },
          {
            id: "tripod-wrong1",
            text: "Positioning it as close to the opening as possible",
            correct: false,
            feedback: "Incorrect. While proximity matters, stability is more important."
          },
          {
            id: "tripod-wrong2",
            text: "Making sure it's the same brand as your other equipment",
            correct: false,
            feedback: "Incorrect. Compatibility matters for some components, but proper setup and stability are more critical."
          }
        ]
      }
    ]
  },
  {
    title: "Final Assessment",
    day: 7,
    scenarioKey: "assessment",
    description: "Put your knowledge to the test in a comprehensive assessment of confined space safety procedures.",
    steps: [
      {
        id: "pre-entry-checklist",
        description: "Which of these is NOT a required pre-entry check for confined space entry?",
        vital: true,
        options: [
          {
            id: "checklist-correct",
            text: "Checking the weather forecast for the next 24 hours",
            correct: true,
            feedback: "Correct! While weather can be relevant for some outdoor confined spaces, it's not a standard required check for all entries."
          },
          {
            id: "checklist-wrong1",
            text: "Verifying the permit is complete and signed",
            correct: false,
            feedback: "Incorrect. Permit verification is absolutely required before entry."
          },
          {
            id: "checklist-wrong2",
            text: "Testing the atmosphere for hazardous gases",
            correct: false,
            feedback: "Incorrect. Atmospheric testing is a critical required step before any confined space entry."
          }
        ]
      },
      {
        id: "gas-readings",
        description: "You get the following gas readings: O₂: 20.9%, H₂S: 0 ppm, CO: 0 ppm, LEL: 12%. What should you do?",
        vital: true,
        options: [
          {
            id: "readings-correct",
            text: "Do not enter. Ventilate the space and retest until LEL is below 10%",
            correct: true,
            feedback: "Correct! An LEL of 12% indicates potentially explosive atmosphere. The space must be ventilated until LEL is below 10%."
          },
          {
            id: "readings-wrong1",
            text: "Enter with caution since all other readings are normal",
            correct: false,
            feedback: "Incorrect and dangerous! An LEL above 10% indicates a potentially explosive atmosphere."
          },
          {
            id: "readings-wrong2",
            text: "Enter with a flame-resistant coverall for protection",
            correct: false,
            feedback: "Incorrect and potentially fatal! No PPE can adequately protect against an explosion risk."
          }
        ]
      },
      {
        id: "exit-procedure",
        description: "When exiting a confined space after work is complete, what should you do?",
        vital: false,
        options: [
          {
            id: "exit-correct",
            text: "Account for all tools and equipment, inform the attendant you're exiting, and sign out on the permit",
            correct: true,
            feedback: "Correct! Proper exit procedures include accounting for all equipment and formal closeout of the permit."
          },
          {
            id: "exit-wrong1",
            text: "Exit quickly to minimize time in the confined space",
            correct: false,
            feedback: "Incorrect. While minimizing time in a confined space is generally good, proper exit procedures must be followed."
          },
          {
            id: "exit-wrong2",
            text: "Leave tools inside for the next shift",
            correct: false,
            feedback: "Incorrect. All tools and equipment must be accounted for and removed unless specifically authorized to remain."
          }
        ]
      },
      {
        id: "comprehensive-scenario",
        description: "You arrive at a permit-required confined space. Place these steps in the correct order:",
        vital: true,
        options: [
          {
            id: "scenario-correct",
            text: "1) Review permit and hazard assessment, 2) Select and inspect PPE, 3) Calibrate and bump test gas detector, 4) Test atmosphere at multiple levels, 5) Decide whether to enter based on results, 6) Monitor continuously during entry, 7) Exit safely and close permit",
            correct: true,
            feedback: "Correct! You've demonstrated understanding of the proper sequence for safe confined space entry."
          },
          {
            id: "scenario-wrong1",
            text: "1) Select PPE, 2) Enter space, 3) Test atmosphere, 4) Review permit, 5) Monitor continuously, 6) Exit and close permit",
            correct: false,
            feedback: "Incorrect. Testing must occur BEFORE entry, and permit review should be the first step."
          },
          {
            id: "scenario-wrong2",
            text: "1) Test atmosphere, 2) Review permit, 3) Select PPE, 4) Enter space, 5) Monitor continuously, 6) Exit and close permit",
            correct: false,
            feedback: "Incorrect. Permit review should be the first step, followed by PPE selection, then atmospheric testing."
          }
        ]
      }
    ]
  }
];
