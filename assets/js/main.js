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

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
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