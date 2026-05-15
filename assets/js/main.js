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
                name: "Dr. Sophie Martin",
                role: "Vétérinaire - Fondatrice",
                image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
                tags: ["Médecine générale", "Dermatologie", "Fondatrice"],
                bio: "Passionnée par les animaux depuis son plus jeune âge, le Dr. Sophie Martin a fondé la Clinique Vétérinaire du Parc en 2008 avec la vision d'offrir des soins d'excellence dans un cadre chaleureux. Diplômée de l'École Nationale Vétérinaire de Lyon, elle a consacré sa carrière à la médecine des petits animaux et à la formation des nouvelles générations de vétérinaires. Sa patience légendaire et son approche douce font d'elle une référence auprès des propriétaires d'animaux anxieux.",
                diplomas: [
                    { year: "2003", name: "Doctorat en Médecine Vétérinaire", school: "ENV Lyon" },
                    { year: "2005", name: "DESV en Dermatologie Vétérinaire", school: "ENV Lyon" },
                    { year: "2008", name: "Certificat en Médecine du Comportement", school: "Université de Cambridge" },
                    { year: "2015", name: "Formation en Acupuncture Vétérinaire", school: "IVAS - USA" },
                    { year: "2020", name: "DU en Médecine Intégrative", school: "Université Paris-Saclay" }
                ],
                specialties: "Médecine générale canine et féline, dermatologie avancée, médecine du comportement, acupuncture vétérinaire, gestion du stress chez les animaux de compagnie."
            },
            lucas: {
                name: "Dr. Lucas Bernard",
                role: "Chirurgien Vétérinaire",
                image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
                tags: ["Chirurgie", "Orthopédie", "Imagerie"],
                bio: "Le Dr. Lucas Bernard est notre expert en chirurgie. Après un internat de 4 ans dans un centre hospitalier universitaire vétérinaire, il a rejoint notre équipe en 2015 pour développer notre bloc opératoire. Spécialisé en chirurgie orthopédique et en chirurgie mini-invasive (arthroscopie), il réalise plus de 500 interventions par an avec un taux de réussite exceptionnel. Son calme et sa précision sont rassurants tant pour les animaux que pour leurs propriétaires.",
                diplomas: [
                    { year: "2006", name: "Doctorat en Médecine Vétérinaire", school: "ENV Maisons-Alfort" },
                    { year: "2010", name: "DESV en Chirurgie Vétérinaire", school: "ENV Maisons-Alfort" },
                    { year: "2012", name: "Internat en Chirurgie Orthopédique", school: "CHU Vétérinaire de Liège" },
                    { year: "2014", name: "Certificat en Arthroscopie", school: "AO VET - Suisse" },
                    { year: "2019", name: "Formation en Chirurgie Mini-Invasive", school: "Royal Veterinary College, Londres" }
                ],
                specialties: "Chirurgie orthopédique (fractures, dysplasies), chirurgie mini-invasive et arthroscopie, chirurgie des tissus mous, imagerie chirurgicale, gestion de la douleur post-opératoire."
            },
            emma: {
                name: "Dr. Emma Petit",
                role: "Médecine Interne",
                image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
                tags: ["Cardiologie", "Néphrologie", "Endocrinologie"],
                bio: "Le Dr. Emma Petit apporte une expertise pointue en médecine interne à notre clinique. Formée dans les meilleurs centres hospitaliers français, elle a développé une approche diagnostique rigoureuse et méthodique. Son domaine de prédilection est la cardiologie vétérinaire : elle dispose d'un échographe cardiaque de dernière génération et réalise des électrocardiogrammes interprétés en temps réel. Elle est également très investie dans la sensibilisation à l'obésité animale et ses conséquences.",
                diplomas: [
                    { year: "2008", name: "Doctorat en Médecine Vétérinaire", school: "ENV Toulouse" },
                    { year: "2012", name: "DESV en Médecine Interne", school: "ENV Toulouse" },
                    { year: "2014", name: "DU en Cardiologie Vétérinaire", school: "Université de Milan" },
                    { year: "2017", name: "Formation en Échocardiographie", school: "Virginia-Maryland College" },
                    { year: "2022", name: "Certificat en Endocrinologie", school: "ACVIM - USA" }
                ],
                specialties: "Cardiologie (insuffisance cardiaque, cardiomyopathie), néphrologie (insuffisance rénale chronique), endocrinologie (diabète, maladies de la thyroïde), oncologie médicale, nutrition clinique."
            },
            julie: {
                name: "Julie Moreau",
                role: "ASV & Réception",
                image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
                tags: ["Soins infirmiers", "Accueil", "Conseils"],
                bio: "Julie Moreau est le cœur battant de notre clinique. Auxiliaire Spécialisée Vétérinaire diplômée depuis 2010, elle assure la coordination des soins, l'accueil des clients et l'assistance lors des consultations et interventions. Sa bienveillance naturelle et son sens de l'organisation font d'elle une interlocutrice privilégiée pour les propriétaires. Julie est également formée aux premiers secours animaliers et anime régulièrement des ateliers de sensibilisation en milieu scolaire.",
                diplomas: [
                    { year: "2010", name: "Brevet Professionnel ASV", school: "Lycée Agricole de Rambouillet" },
                    { year: "2013", name: "Formation en Anesthésie Vétérinaire", school: "AFVAC" },
                    { year: "2016", name: "Certificat en Soins Intensifs", school: "ISVPA" },
                    { year: "2019", name: "Formation en Communication Client", school: "IFAC" },
                    { year: "2023", name: "Attestation de Premiers Secours Animaliers", school: "Croix-Rouge Française" }
                ],
                specialties: "Assistance aux consultations et chirurgies, gestion des soins infirmiers, accueil et conseil clientèle, gestion des stocks médicaux, éducation et prévention, premiers secours animaliers."
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