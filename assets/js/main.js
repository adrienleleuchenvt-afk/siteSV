// Services data
        const serviceData = {
            consultations: {
                title: "Consultations",
                icon: "🏥",
                subtitle: "Médecine préventive et curative",
                description: "La consultation est le pilier de la santé de votre animal. Lors de chaque visite, le vétérinaire réalise un examen clinique complet (auscultation cardiaque et pulmonaire, palpation abdominale, inspection des muqueuses, contrôle du poids et de l'état général). Nous prenons le temps d'écouter vos observations et de répondre à toutes vos questions. Chaque animal bénéficie d'un dossier médical informatisé permettant un suivi chronologique précis et une transmission sécurisée des informations entre les vétérinaires de l'équipe.",
                includes: [
                    "Examen clinique complet et palpation",
                    "Auscultation cardiaque et respiratoire",
                    "Contrôle du poids et condition corporelle",
                    "Conseils personnalisés nutrition et comportement",
                    "Dossier médical informatisé et suivi chronologique",
                    "Prise de sang et analyses si nécessaire"
                ],
                duration: "30 à 45 minutes",
                price: "À partir de 48€",
                availability: "Lundi au Samedi, sur rendez-vous"
            },
            vaccinations: {
                title: "Vaccinations",
                icon: "💉",
                subtitle: "Protection optimale selon les protocoles officiels",
                description: "La vaccination reste le meilleur moyen de protéger votre animal contre les maladies infectieuses graves. Nous suivons scrupuleusement les recommandations du Groupe d'Étude en Pathologie Infectieuse du BSAVA et de l'AFVAC. Chaque protocole est personnalisé selon l'âge, le mode de vie (intérieur/extérieur, voyages) et l'état de santé de votre compagnon. Nous utilisons des vaccins de dernière génération à vecteur recombinant, offrant une efficacité optimale avec une réactivité minimale.",
                includes: [
                    "Vaccination CHPPiL (chien) ou Typhus-Rhino-Leucose (chat)",
                    "Vaccination rage (voyages et réglementation)",
                    "Vaccination NAC (lapin myxomatose, lapinorrhage)",
                    "Examen pré-vaccinal systématique",
                    "Carnet de vaccination à jour et certificat international",
                    "Rappels personnalisés par email/SMS"
                ],
                duration: "20 à 30 minutes",
                price: "À partir de 55€ (vaccin + consultation)",
                availability: "Lundi au Samedi, sur rendez-vous"
            },
            chirurgie: {
                title: "Chirurgie",
                icon: "🔬",
                subtitle: "Bloc opératoire moderne et stérile",
                description: "Notre bloc chirurgical est équipé d'un matériel de pointe : table hydraulique chauffante, appareil d'anesthésie gazeuse avec monitoring multiparamétrique (ECG, SpO2, capnographie, tension artérielle), bistouri électrique et lampe scialytique LED. Toutes les interventions sont réalisées sous anesthésie générale contrôlée avec un protocole de gestion de la douleur per et post-opératoire (multimodale). La stérilisation est assurée par autoclave classe B et le bloc respecte les normes d'asepsie hospitalière.",
                includes: [
                    "Anesthésie générale avec monitoring multiparamétrique",
                    "Gestion de la douleur per et post-opératoire",
                    "Chirurgie des tissus mous (stérilisation, castration, tumeurs)",
                    "Chirurgie orthopédique (fractures, ligaments croisés)",
                    "Chirurgie d'urgence (laparotomie, hémostase)",
                    "Hospitalisation post-opératoire avec surveillance"
                ],
                duration: "Variable selon l'intervention",
                price: "Devis personnalisé sur consultation",
                availability: "Lundi au Vendredi (programmées), 24/7 (urgences)"
            },
            dentisterie: {
                title: "Dentisterie",
                icon: "🦷",
                subtitle: "Soins bucco-dentaires complets",
                description: "Les maladies bucco-dentaires affectent plus de 80% des chiens et chats de plus de 3 ans. Notre service dentaire utilise un détartreur à ultrasons avec irrigation et aspiration, ainsi qu'une polisseuse dentaire. Chaque intervention débute par une radiographie dentaire complète permettant d'évaluer l'état des racines et de l'os alvéolaire. Les extractions sont réalisées avec une technique chirurgicale respectant le tissu osseux et les nerfs. Un contrôle à 2 semaines est systématiquement proposé.",
                includes: [
                    "Radiographie dentaire panoramique",
                    "Détartrage à ultrasons sous anesthésie",
                    "Polissage et fluoridation",
                    "Extractions chirurgicales si nécessaire",
                    "Traitement des abcès et fistules",
                    "Conseils d'hygiène dentaire à domicile"
                ],
                duration: "45 à 90 minutes (sous anesthésie)",
                price: "À partir de 180€ (détartrage + radio)",
                availability: "Sur rendez-vous, mardi et jeudi matin"
            },
            imagerie: {
                title: "Imagerie Médicale",
                icon: "🩺",
                subtitle: "Diagnostic par l'image de haute précision",
                description: "Notre plateau technique d'imagerie a été entièrement renouvelé en 2026. Il comprend un appareil de radiographie numérique DR (dose réduite, haute définition), un échographe Doppler couleur avec sondes sectorielle, linéaire et micro-convexe (adapté aux petits animaux et aux NAC), et notre nouveau scanner à rayons X haute définition. Ces équipements permettent un diagnostic rapide et précis des affections thoraciques, abdominales, orthopédiques et cardiaques, directement sur place sans déplacement stressant.",
                includes: [
                    "Radiographie numérique DR (thorax, abdomen, os)",
                    "Échographie abdominale et cardiaque (Doppler)",
                    "Scanner haute définition (nouveau 2026)",
                    "Interprétation par imagerie spécialisée",
                    "Compte-rendu détaillé avec images numériques",
                    "Transmission aux spécialistes externes si besoin"
                ],
                duration: "20 à 40 minutes",
                price: "Radio à partir de 65€, Écho à partir de 85€",
                availability: "Lundi au Samedi, sur rendez-vous ou lors de consultations"
            },
            urgences: {
                title: "Urgences 24/7",
                icon: "🚑",
                subtitle: "Service permanent pour les situations critiques",
                description: "Notre service d'urgences est opérationnel 24 heures sur 24, 7 jours sur 7, 365 jours par an. Une équipe de garde (vétérinaire + ASV) est présente en permanence pour prendre en charge les traumatismes, intoxications, détresses respiratoires ou cardiaques, collapsus, dystocies et toute situation vitale. Le bloc d'urgence dispose d'un matériel de réanimation (oxygénothérapie, défibrillateur, perfuseurs électriques) et d'une salle d'hospitalisation intensive avec cages chauffantes et monitoring continu.",
                includes: [
                    "Tri et évaluation vitale immédiate",
                    "Oxygénothérapie et réanimation cardio-pulmonaire",
                    "Perfusion et stabilisation",
                    "Sutures et traitement des plaies",
                    "Hospitalisation intensive avec surveillance",
                    "Liaison avec centres de référence si spécialisation requise"
                ],
                duration: "Immédiat",
                price: "Frais d'urgence : 85€ (incluant l'acte de base)",
                availability: "24h/24 - 7j/7 - 365j/an, appeler avant arrivée"
            }
        };

        // Team members data
        const teamData = {
            sophie: {
                name: "Dr. Adrien Le Leuch",
                role: "Médecine interne & cardiologie",
                image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
                tags: ["Médecine interne", "Cardiologie", "CEAV Médecine interne"],
                bio: "Le Dr. Adrien Le Leuch est spécialiste en médecine interne et cardiologie vétérinaire. Diplômé du CEAV de médecine interne, il accompagne les cas complexes avec une expertise diagnostic poussée et un suivi médical précis. Sa pratique se concentre sur les maladies cardiaques, métaboliques et inflammatoires des petits animaux.",
                diplomas: [
                    { year: "2021", name: "CEAV Médecine interne", school: "Collège Européen d'Anesthésie Vétérinaire" },
                    { year: "2015", name: "Doctorat en Médecine Vétérinaire", school: "ENV" }
                ],
                specialties: "Cardiologie vétérinaire, médecine interne, maladies métaboliques, suivi de l'insuffisance cardiaque, diagnostics complexes et gestion des pathologies chroniques."
            },
            lucas: {
                name: "Dr. Maxime Bousses",
                role: "Chirurgie, traumatologie ostéo-articulaire et orthopédie animale",
                image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
                tags: ["Chirurgie", "Orthopédie", "Traumatologie"],
                bio: "Le Dr. Maxime Bousses est notre spécialiste des interventions chirurgicales et des traumatismes ostéo-articulaires. Diplômé du CES Traumatologie ostéo-articulaire et orthopédie animale, il maîtrise les techniques chirurgicales les plus avancées pour restaurer la mobilité et le confort des animaux.",
                diplomas: [
                    { year: "2022", name: "CES Traumatologie ostéo-articulaire et orthopédie animale", school: "Collège Européen Vétérinaire" },
                    { year: "2014", name: "Doctorat en Médecine Vétérinaire", school: "ENV" }
                ],
                specialties: "Chirurgie orthopédique, prise en charge des fractures, traumatologie ostéo-articulaire, prothèses et fixateurs externes, réhabilitation post-opératoire."
            },
            emma: {
                name: "Dr. Lucie Lengellé",
                role: "Comportement animal",
                image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
                tags: ["Comportement", "CEAV", "Animaux domestiques"],
                bio: "Le Dr. Lucie Lengellé est spécialisée en comportement animal. Titulaire du CEAV Médecine du comportement des animaux domestiques, elle aide les propriétaires à comprendre et modifier les comportements indésirables grâce à des protocoles personnalisés et respectueux du bien-être animal.",
                diplomas: [
                    { year: "2023", name: "CEAV Médecine du comportement des animaux domestiques", school: "Collège Européen d'Anesthésie Vétérinaire" },
                    { year: "2016", name: "Doctorat en Médecine Vétérinaire", school: "ENV" }
                ],
                specialties: "Évaluation du comportement, prise en charge des troubles du comportement, rééducation comportementale, socialisation et adaptation des animaux domestiques, approche positive et scientifique."
            },
            julie: {
                name: "Dr. Alexis Racine",
                role: "Ophtalmologie",
                image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
                tags: ["Ophtalmologie", "Vision animale", "Chirurgie oculaire"],
                bio: "Le Dr. Alexis Racine est spécialisé en ophtalmologie vétérinaire. Titulaire d'un DE d'Ophtalmologie, il traite les pathologies oculaires des petits animaux, de la cataracte aux ulcères cornéens, en passant par les glaucomes et les blessures traumatiques de l'œil.",
                diplomas: [
                    { year: "2024", name: "DE d'Ophtalmologie", school: "Collège Européen Vétérinaire" },
                    { year: "2017", name: "Doctorat en Médecine Vétérinaire", school: "ENV" }
                ],
                specialties: "Examens oculaires approfondis, chirurgie ophtalmologique, prise en charge des infections et inflammations oculaires, gestion des glaucomes et des troubles de la vision, consultations de suivi post-opératoire."
            }
        };

        // Modal functions
        function openModal(memberId) {
            const data = teamData[memberId];
            if (!data) return;

            document.getElementById('modalImg').src = data.image;
            document.getElementById('modalName').textContent = data.name;
            document.getElementById('modalRole').textContent = data.role;
            document.getElementById('modalBio').textContent = data.bio;
            document.getElementById('modalSpecialties').textContent = data.specialties;

            // Tags
            const tagsContainer = document.getElementById('modalTags');
            tagsContainer.innerHTML = data.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

            // Diplomas
            const diplomasContainer = document.getElementById('modalDiplomas');
            diplomasContainer.innerHTML = data.diplomas.map(dip => `
                <li>
                    <span class="year">${dip.year}</span>
                    <div>
                        <div class="dip-name">${dip.name}</div>
                        <div class="dip-school">${dip.school}</div>
                    </div>
                </li>
            `).join('');

            document.getElementById('teamModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal(event) {
            if (event && event.target !== event.currentTarget) return;
            document.getElementById('teamModal').classList.remove('active');
            document.body.style.overflow = '';
        }

        // Service Modal functions
        function openServiceModal(serviceId) {
            const data = serviceData[serviceId];
            if (!data) return;

            document.getElementById('serviceModalIcon').textContent = data.icon;
            document.getElementById('serviceModalTitle').textContent = data.title;
            document.getElementById('serviceModalSubtitle').textContent = data.subtitle;
            document.getElementById('serviceModalDesc').textContent = data.description;

            // Includes
            const includesContainer = document.getElementById('serviceModalIncludes');
            includesContainer.innerHTML = data.includes.map(item => `
                <li>
                    <span class="year" style="background: var(--primary); color: white;">✓</span>
                    <div>
                        <div class="dip-name">${item}</div>
                    </div>
                </li>
            `).join('');

            // Info grid
            const infoContainer = document.getElementById('serviceModalInfo');
            infoContainer.innerHTML = `
                <div class="service-info-item">
                    <div class="label">Durée</div>
                    <div class="value">${data.duration}</div>
                </div>
                <div class="service-info-item">
                    <div class="label">Tarif indicatif</div>
                    <div class="value">${data.price}</div>
                </div>
                <div class="service-info-item">
                    <div class="label">Disponibilité</div>
                    <div class="value">${data.availability}</div>
                </div>
            `;

            document.getElementById('serviceModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeServiceModal(event) {
            if (event && event.target !== event.currentTarget) return;
            document.getElementById('serviceModal').classList.remove('active');
            document.body.style.overflow = '';
        }



        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
                closeServiceModal();
            }
        });

        // Mobile menu toggle
        function toggleMenu() {
            document.getElementById('navLinks').classList.toggle('active');
        }

        // Close menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                document.getElementById('navLinks').classList.remove('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
            }
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });